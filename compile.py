import os
from jinja2 import Template
from typing import List, Dict, Any


RESUME_DIR = "resume"
OUT_FILE = "index.html"

def main(args: List[str]):

    resume: Dict[str, Dict[str, Any]] = {}

    for section in os.listdir(RESUME_DIR):
        print(section)
        resume[section] = {}
        for textfile in os.listdir(os.path.join(RESUME_DIR, section)):
            print("--", textfile)
            fpath = os.path.join(RESUME_DIR, section, textfile)
            with open(fpath) as f:
                name, _ = os.path.splitext(textfile)
                resume[section][name] = f.read()

    with open(os.path.join("templates", "index.j2.html")) as f:
        template = Template(f.read())

    
    with open(OUT_FILE, "w") as f:
        rendered = template.render(**resume)
        f.write(rendered)

if __name__ == "__main__":
    import sys
    main(sys.argv)