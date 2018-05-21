Scripts
=======

Use `collectValues.py` to collect unit, building and tech stats such as costs
from json files generated for the `aoe2stats.net` project (https://github.com/aocpip/aoe2stats).

Use `kvms2json.py` to turn a `key-value-modded-strings-utf8.txt` file into a json
formatted file to be uses as a source for the tech tree. You can also add the values from `collectValues.py`
as metadata. Neat!

Example invocation:

```
./collectValues.py dlc_units.json dlc_structures.json dlc_technologies.json > /tmp/values.json
./kvms2json.py key-value-modded-strings-utf8.txt /tmp/values.json > ../data/data.json
```
