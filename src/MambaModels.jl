module MambaModels

using Reexport 

@reexport using StatisticalRethinking, Distributions, RDatasets, DataFrames
@reexport using StatsBase, StatsPlots, StatsFuns 
@reexport using CSV, DelimitedFiles, Serialization
@reexport using MCMCChain, Mamba

using DataStructures

const src_path_m = @__DIR__

"""

# rel_path_m_m

Relative path using the MambaModels src/ directory. Copied from
[DynamicHMCExamples.jl](https://github.com/tpapp/DynamicHMCExamples.jl)

### Example to get access to the data subdirectory
```julia
rel_path_m("..", "data")
```
"""
rel_path_m(parts...) = normpath(joinpath(src_path_m, parts...))

include("scriptentry_m.jl")
include("generate_m.jl")

export
  rel_path_m,
  script_dict_m,
  generate_m

end # module
