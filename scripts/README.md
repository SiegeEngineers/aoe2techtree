Scripts
=======

Use `./generateDataFiles.py` to collect unit, building and tech stats such as costs
from the dat files using `genieutils-py`,
the descriptive strings from a key-value-strings-utf8.txt file from aoe2de,
and the tech tree data from the civTechTrees.json file from aoe2de.

Create and activate a virtual environment with genieutils-py installed:

```sh
python3 -m venv venv
source venv/bin/activate
pip install genieutils-py
```

Example invocation:

```sh
source venv/bin/activate
./generateDataFiles.py ~/aoe/Aoe2DE\ proton/
```
