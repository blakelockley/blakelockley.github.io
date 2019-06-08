import os
import json
from jinja2 import Template
from typing import List, Dict, Any

TEMPLATE_DIR = "templates"
RESUME_TEMPLATE = "index.j2.html"
RESUME_DIR = "resume"
OUT_FILE = "index.html"

def main(args: List[str]):

    resume: Dict[str, List[Dict[str, str]]] = {}

    for section in os.listdir(RESUME_DIR):
        resume[section] = []
        items = os.listdir(os.path.join(RESUME_DIR, section))
        for textfile in sorted(items):
            fpath = os.path.join(RESUME_DIR, section, textfile)
            with open(fpath) as f:
                resume[section].append(json.load(f))

    with open(os.path.join(TEMPLATE_DIR, RESUME_TEMPLATE)) as f:
        template = Template(f.read())

    with open(OUT_FILE, "w") as f:
        f.write(template.render(**resume))

if __name__ == "__main__":
    import sys
    main(sys.argv)