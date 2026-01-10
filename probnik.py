import json

a = [
    "rrrrrtb.txt",
    "12.ods",
    "papka",
    "aaaab.txt",
    "bbbb.txt",
    "popaa",
    "emaail.txt",
    "zzzzz.txt",
    "bbbba.txt",
    "bfolder",
    "puk.txt",
    "folder",
    "pipka",
    "zfolder",
    "20250818_081607.jpg",
    "aaaa.txt",
    "GIMP-3.0.6-x86_64.AppImage.torrent",
    "rrrrr.txt",
    "zzzzzb.txt",
    "package-lock.json",
    "gnl.txt.save",
    "afolder"
]

files = []
folders = []
for obj in a:
    (files if '.' in obj else folders).append(obj)

objects = sorted(folders) + sorted(files)
print(json.dumps(objects, indent=0))
