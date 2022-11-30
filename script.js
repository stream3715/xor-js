function check() {
  if (form.a.value == "" || form.b.value == "") {
    alert("入力してください"); //エラーメッセージを出力
  } else {
    const idList = form.a.value.split("\n");
    const b = BigInt(hexToBn(form.b.value));
    let xors = [];
    idList.forEach((x) => {
      if (x.includes(" ")) {
        x.replace(" ", "");
      }
      if (x == "") return;
      const idn = hexToBn(x);
      const dist = idn ^ b;
      nearestHex = x;
      nearest = idn;
      nearestDist = dist;

      xors.push({
        hex: x,
        bin: idn,
        xor: dist,
      });
    });

    compareFn = function (a, b) {
      if (a.xor < b.xor) {
        return -1;
      }
      if (a.xor > b.xor) {
        return 1;
      }
      // a は b と等しくなければならない
      return 0;
    };

    xors.sort(compareFn);
    console.log(xors);

    document.getElementById("nearest").textContent = `nearest: ${xors[0].hex}`;
    document.getElementById("result0").textContent = `contentBin: ${(
      "0".repeat(160) + b.toString(2)
    ).slice(-160)}`;
    document.getElementById("result1").textContent = `nearestBin: ${(
      "0".repeat(160) + xors[0].bin.toString(2)
    ).slice(-160)}`;
    document.getElementById("result2").textContent = `xorBin:     ${(
      "0".repeat(160) + xors[0].xor.toString(2)
    ).slice(-160)}`;
  }
}

function hexToBn(hex) {
  if (hex.slice(0, 1) == "/") {
    hex = hex.slice(1);
  }
  if (hex.length % 2) {
    hex = "0" + hex;
  }

  var bn = BigInt(0);

  while (hex.length != 0) {
    bn = bn * BigInt(256);
    var highbyte = hex.slice(0, 2);
    bn += BigInt("0x" + highbyte);
    hex = hex.slice(2);
  }
  return bn;
}
