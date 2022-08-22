import { create } from "ipfs-http-client";
var Buffer = require("buffer/").Buffer;

//import IpfsAPI from "ipfs-api";
//const ipfs=new IPFS({host:'ipfs.infura.io',port:5001,protocol:'https'});
//const ipfs = IpfsAPI("ipfs.infura.io", "5001", { protocol: "https" });
// note: the trailing slash is important!

const ipfs = create("https://ipfs.infura.io:5001/api/v0");

export const ipfsMint = async (testFile, data) => {
  try {
    ///let testFile = fs.readFileSync(`${tokenUrl}`);
    let testBuffer = new Buffer.from(testFile);

    const hash = await ipfs.add(testBuffer);

    // console.log(`https://gateway.ipfs.io/ipfs/${hash[0].path}`);
    console.log("hash", hash);
    var hash1 = hash.path;

    let testFile1 = {
      Name: `${data.name}`,
      Price: `${data.price}`,
      Description: `${data.description}`,
      Url: `https://gateway.ipfs.io/ipfs/${hash1}`,
    };

    let testBuffer2 = new Buffer.from(JSON.stringify(testFile1));

    const ImgUrl = await ipfs.add(testBuffer2);
    console.log(ImgUrl);
    // console.log(`https://gateway.ipfs.io/ipfs/${ImgUrl[0].path}`);

    let hash2 = ImgUrl.path;

    const contentUrl =`https://gateway.ipfs.io/ipfs/${hash2}`; //`https://gateway.ipfs.io/ipfs/${hash2}`;

    return contentUrl;
  } catch (e) {
    console.log(e);
  }
};
