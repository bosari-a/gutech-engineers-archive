const fs = require("fs");
const path = require("path/posix");

let ps = fs.readdirSync("./").filter((p) => !p.includes("."));
ps.map((p) => {
  let new_p = p;
  if (p.includes(" ")) {
    new_p = p.split(" ").join("-");
    fs.renameSync(p, new_p);
  }
  return new_p;
});

class Doc {
  constructor(name, description, path, thumbnail) {
    this.name = name;
    this.description = description;
    this.path = path;
    this.thumbnail = thumbnail;
  }
}

for (let j = 0; j < ps.length; j++) {
  const p = ps[j];
  const arr = [];
  const d = fs.readdirSync(p);
  for (let i = 0; i < d.length; i++) {
    const f = d[i];
    if (f.includes("png") || !f.includes(".")) {
      continue;
    }
    const fp = path.join(p, f);
    let new_fp = fp;
    if (f.includes(" ")) {
      new_fp = path.join(p, f.split(" ").join("_"));
      fs.renameSync(fp, new_fp);
    }
    let imgf = f.split(".");
    imgf.pop();
    imgf = imgf.join(".") + ".png";
    const imgpath = path.join(p, imgf);
    const obj = new Doc(
      f,
      f,
      `/web/viewer.html?file=https://github.com/bosari-a/gutech-engineers-archive/raw/main/${new_fp}`,
      imgpath
    );
    arr.push(obj);
  }
  const subject = {
    name: p,
    docs: arr,
  };
  const json_out = path.join(p, `${path.basename(p)}.json`);
  fs.writeFileSync(json_out, JSON.stringify(subject), { encoding: "utf-8" });
}
