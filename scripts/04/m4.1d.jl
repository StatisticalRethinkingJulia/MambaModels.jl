# # Linear regression

# We estimate simple linear regression model with a half-T prior.
# First, we load the packages we use.

using StatisticalRethinking
using DynamicHMC, TransformVariables, LogDensityProblems, MCMCDiagnostics
using Parameters, ForwardDiff

ProjDir = rel_path("..", "scripts", "04")
cd(ProjDir)

# Import the dataset.

howell1 = CSV.read(rel_path("..", "data", "Howell1.csv"), delim=';')
df = convert(DataFrame, howell1);

# Use only adults and standardize

df2 = filter(row -> row[:age] >= 18, df)

# Show the first six rows of the dataset.

first(df2, 6)

# Then define a structure to hold the data: observables and the degrees of freedom for the prior.

"""
Half-T for `σ`.
"""
struct HeightsProblem{TY <: AbstractVector, Tν <: Real}
    "Observations."
    y::TY
    "Degrees of freedom for prior on sigma."
    ν::Tν
end

# Then make the type callable with the parameters *as a single argument*.

function (problem::HeightsProblem)(θ)
    @unpack y, ν = problem   # extract the data
    @unpack μ, σ = θ
    loglikelihood(Normal(μ, σ), y) + logpdf(TDist(ν), σ)
end

# We should test this, also, this would be a good place to benchmark and
# optimize more complicated problems.

obs = convert(Vector{Float64}, df2[:height])
p = HeightsProblem(obs, 1.0);
p((μ = 178, σ = 5.0,))

# Wrap the problem with a transformation, then use Flux for the gradient.

P = TransformedLogDensity(as((σ = as(Real, 0, 10), μ  = as(Real, 0, 200))), p)
∇P = ADgradient(:ForwardDiff, P);

# Finally, we sample from the posterior. `chain` holds the chain (positions and
# diagnostic information), while the second returned value is the tuned sampler
# which would allow continuation of sampling.

chain, NUTS_tuned = NUTS_init_tune_mcmc(∇P, 1000);

# We use the transformation to obtain the posterior from the chain.

posterior = TransformVariables.transform.(Ref(∇P.transformation), get_position.(chain));

# Extract the parameter posterior means: `β`,

posterior_β = mean(first, posterior)

# then `σ`:

posterior_σ = mean(last, posterior)

# Effective sample sizes (of untransformed draws)

ess = mapslices(effective_sample_size,
                get_position_matrix(chain); dims = 1)

# NUTS-specific statistics

NUTS_statistics(chain)

cmdstan_result = "
Iterations = 1:1000
Thinning interval = 1
Chains = 1,2,3,4
Samples per chain = 1000

Empirical Posterior Estimates:
          Mean        SD       Naive SE      MCSE      ESS
sigma   7.7641872 0.29928194 0.004732063 0.0055677898 1000
   mu 154.6055177 0.41989355 0.006639100 0.0085038356 1000

Quantiles:
         2.5%      25.0%       50.0%      75.0%       97.5%  
sigma   7.21853   7.5560625   7.751355   7.9566775   8.410391
   mu 153.77992 154.3157500 154.602000 154.8820000 155.431000
";

# Extract the parameter posterior means: `β`,

[posterior_β, posterior_σ]

# end of m4.5d.jl