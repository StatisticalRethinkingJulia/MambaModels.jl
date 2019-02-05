```@meta
CurrentModule = MambaModels
```

## `maximum_a_posteriori`
```@docs
maximum_a_posteriori(model, lower_bound, upper_bound)
```

## `link`
```@docs
link(xrange, chain, vars, xbar) 
```

## `rel_path_m`
```@docs
rel_path_m(parts...)
```

## `generate`
```@docs
generate_m(; sd=script_dict_m)
generate_m(chapter::AbstractString; sd=script_dict_m)
generate_m(chapter::AbstractString, scriptfile::AbstractString; sd=script_dict_m)
```

## `ScriptEntry`
```@docs
ScriptEntry
```

## `scriptentry`
```@docs
scriptentry(scriptfile; nb = true, exe = true, doc = true)
```

