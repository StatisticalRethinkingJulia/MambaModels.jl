var documenterSearchIndex = {"docs": [

{
    "location": "intro/#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "intro/#MambaModels-1",
    "page": "Home",
    "title": "MambaModels",
    "category": "section",
    "text": "This package contains Julia Mamba versions of selected code snippets and mcmc models contained in the R package \"rethinking\" associated with the book Statistical Rethinking by Richard McElreath."
},

{
    "location": "02/m2.1m/#",
    "page": "m2.1m",
    "title": "m2.1m",
    "category": "page",
    "text": "EditURL = \"https://github.com/StatisticalRethinkingJulia/MambaModels.jl/blob/master/scripts/02/m2.1m.jl\"#using Distributed\n#@everywhere using MambaModels\nusing MambaModels, MCMCChainsDataglobe_toss = Dict{Symbol, Any}(\n  :w => [6, 7, 5, 6, 6],\n  :n => [9, 9, 9, 9, 9]\n)\nglobe_toss[:N] = length(globe_toss[:w]);Model Specificationmodel = Model(\n  w = Stochastic(1,\n    (n, p, N) ->\n      UnivariateDistribution[Binomial(n[i], p) for i in 1:N],\n    false\n  ),\n  p = Stochastic(() -> Beta(1, 1))\n);Initial Valuesinits = [\n  Dict(:w => globe_toss[:w], :n => globe_toss[:n], :p => 0.5),\n  Dict(:w => globe_toss[:w], :n => globe_toss[:n], :p => rand(Beta(1, 1)))\n];Sampling Schemescheme = [NUTS(:p)]\nsetsamplers!(model, scheme);MCMC Simulationschn = mcmc(model, globe_toss, inits, 10000, burnin=2500, thin=1, chains=2);Describe drawsdescribe(chn)Convert to MCMCChains.Chains objectchn2 = MCMCChains.Chains(chn.value, Symbol.(chn.names))Describe the MCMCChainsMCMCChains.describe(chn2)Plot chn2MCMCChains.plot(chn2)End of 02/m2.1m.jlThis page was generated using Literate.jl."
},

{
    "location": "04/m4.4m/#",
    "page": "m4.4m",
    "title": "m4.4m",
    "category": "page",
    "text": "EditURL = \"https://github.com/StatisticalRethinkingJulia/MambaModels.jl/blob/master/scripts/04/m4.4m.jl\"#using Distributed\n#@everywhere using MambaModels\nusing MambaModels\ngr(size=(400,400))\n\n# Data\nline = Dict{Symbol, Any}()\n\nhowell1 = CSV.read(rel_path(\"..\", \"data\", \"Howell1.csv\"), delim=\';\')\ndf = convert(DataFrame, howell1);Use only adultsdf2 = filter(row -> row[:age] >= 18, df);\nmean_weight = mean(df2[:weight])\ndf2[:weight_c] = convert(Vector{Float64}, df2[:weight]) .- mean_weight ;\nline[:x] = convert(Array{Float64,1}, df2[:weight_c]);\nline[:y] = convert(Array{Float64,1}, df2[:height]);\nline[:xmat] = convert(Array{Float64,2}, [ones(length(line[:x])) line[:x]])Model Specificationmodel = Model(\n  y = Stochastic(1,\n    (xmat, beta, s2) -> MvNormal(xmat * beta, sqrt(s2)),\n    false\n  ),\n  beta = Stochastic(1, () -> MvNormal([178, 0], [sqrt(10000), sqrt(100)])),\n  s2 = Stochastic(() -> Uniform(0, 50))\n)Initial Valuesinits = [\n  Dict{Symbol, Any}(\n    :y => line[:y],\n    :beta => [rand(Normal(178, 100)), rand(Normal(0, 10))],\n    :s2 => rand(Uniform(0, 50))\n  )\n  for i in 1:3\n]Tuning Parametersscale1 = [0.5, 0.25]\nsummary1 = identity\neps1 = 0.5\n\nscale2 = 0.5\nsummary2 = x -> [mean(x); sqrt(var(x))]\neps2 = 0.1Define sampling schemescheme = [\n  Mamba.NUTS([:beta]),\n  Mamba.Slice([:s2], 10)\n]\n\nsetsamplers!(model, scheme)MCMC Simulationchn = mcmc(model, line, inits, 10000, burnin=1000, chains=3)Show draws summarydescribe(chn)Convert to MCMCChains.Chains objectchn2 = MCMCChains.Chains(chn.value, Symbol.(chn.names))Describe the MCMCChainsMCMCChains.describe(chn2)Plot chn2MCMCChains.plot(chn2)End of 04/m4.1m.jlThis page was generated using Literate.jl."
},

{
    "location": "#",
    "page": "Functions",
    "title": "Functions",
    "category": "page",
    "text": "CurrentModule = MambaModels"
},

{
    "location": "#MambaModels.rel_path_m-Tuple",
    "page": "Functions",
    "title": "MambaModels.rel_path_m",
    "category": "method",
    "text": "relpathm\n\nRelative path using the MambaModels src/ directory.\n\nExample to get access to the data subdirectory\n\nrel_path_m(\"..\", \"data\")\n\n\n\n\n\n"
},

{
    "location": "#rel_path_m-1",
    "page": "Functions",
    "title": "rel_path_m",
    "category": "section",
    "text": "rel_path_m(parts...)"
},

{
    "location": "#MambaModels.generate_m-Tuple{}",
    "page": "Functions",
    "title": "MambaModels.generate_m",
    "category": "method",
    "text": "generate\n\nUtility function to generate all notebooks and chapters from scripts in the scripts directory.\n\nMethod\n\ngenerate_m(sd = script_dict_m)\n\nRequired arguments\n\nNone, all notebooks/.. and chapters/.. files are regenerated.\n\n\n\n\n\n"
},

{
    "location": "#MambaModels.generate_m-Tuple{AbstractString}",
    "page": "Functions",
    "title": "MambaModels.generate_m",
    "category": "method",
    "text": "generate\n\nGenerate notebooks and scripts in a single chapter.\n\nMethod\n\ngenerate_m(chapter::AbstractString)\n\nRequired arguments\n\nGenerate notebooks and scripts in a single chapter, e.g. generate_m(\"04\")\n\n\n\n\n\n"
},

{
    "location": "#MambaModels.generate_m-Tuple{AbstractString,AbstractString}",
    "page": "Functions",
    "title": "MambaModels.generate_m",
    "category": "method",
    "text": "generate\n\nGenerate a single notebook and script\n\nMethod\n\ngenerate_m(chapter::AbstractString, file::AbstractString)\n\nRequired arguments\n\nGenerate notebook and script file in chapter, e.g. generatem(\"04\", \"m4.1d.jl\") or  generatem(\"04/m4.1d.jl\")\n\n\n\n\n\n"
},

{
    "location": "#generate_m-1",
    "page": "Functions",
    "title": "generate_m",
    "category": "section",
    "text": "generate_m(; sd=script_dict_m)\ngenerate_m(chapter::AbstractString; sd=script_dict_m)\ngenerate_m(chapter::AbstractString, scriptfile::AbstractString; sd=script_dict_m)"
},

{
    "location": "#StatisticalRethinking.ScriptEntry",
    "page": "Functions",
    "title": "StatisticalRethinking.ScriptEntry",
    "category": "type",
    "text": "ScriptEntry\n\nDefine processing requirements for chapter scripts\n\nConstructor\n\nscriptentry(scriptfile;; nb=true, exe=true, doc=true)\n\nRequired arguments\n\n* `scriptfile::AbstractString`        : Script file\n\nOptional arguments\n\n* `nb::Bool`      : Generate a notebook version in notebooks directory\n* `exe::Bool`     : Execute the notebook (for testing or documentation purposes)\n* `doc::Bool`     : Insert documention into Github pages\n\nIf exe = false and doc = true it is assumed the appropriate .md files have been manually created and stored in docs/src/nn/... (Travis will terminate if runs take too long).\n\n\n\n\n\n"
},

{
    "location": "#ScriptEntry-1",
    "page": "Functions",
    "title": "ScriptEntry",
    "category": "section",
    "text": "ScriptEntry"
},

{
    "location": "#StatisticalRethinking.scriptentry-Tuple{Any}",
    "page": "Functions",
    "title": "StatisticalRethinking.scriptentry",
    "category": "method",
    "text": "scriptentry\n\nConstructor for ScriptEntry objects.\n\nConstructor\n\nscriptentry(scriptfile;; nb=true, exe=true, doc=true)\n\nRequired arguments\n\n* `scriptfile::AbstractString`        : Script file\n\nOptional arguments\n\n* `nb::Bool`      : Generate a notebook version in notebooks directory\n* `exe::Bool`     : Execute the notebook (for testing or documentation purposes)\n* `doc::Bool`     : Insert documention into Github pages\n\nIf exe = false and doc = true it is assumed the appropriate .md files have been manually created and stored in docs/src/nn/... (Travis will terminate if runs take too long).\n\n\n\n\n\n"
},

{
    "location": "#scriptentry-1",
    "page": "Functions",
    "title": "scriptentry",
    "category": "section",
    "text": "scriptentry(scriptfile; nb = true, exe = true, doc = true)"
},

]}
