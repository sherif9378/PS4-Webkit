importScripts('../../../../resources/js-test-pre.js');
importScripts('../../../resources/common.js');

description("Test verification with RSA-PSS SHA-1 using an imported key in workers");

jsTestIsAsync = true;

var extractable = false;
var text = asciiToUint8Array("Hello, World!");
var rsaImportParams = {
    name: "RSA-PSS",
    hash: "SHA-1",
}
var jwkKey = {
    kty: "RSA",
    alg: "PS1",
    use: "sig",
    key_ops: ["verify"],
    ext: true,
    n: "rcCUCv7Oc1HVam1DIhCzqknThWawOp8QLk8Ziy2p10ByjQFCajoFiyuAWl-R1WXZaf4xitLRracT9agpzIzc-MbLSHIGgWQGO21lGiImy5ftZ-D8bHAqRz2y15pzD4c4CEou7XSSLDoRnR0QG5MsDhD6s2gV9mwHkrtkCxtMWdBi-77as8wGmlNRldcOSgZDLK8UnCSgA1OguZ989bFyc8tOOEIb0xUSfPSz3LPSCnyYz68aDjmKVeNH-ig857OScyWbGyEy3Biw64qun3juUlNWsJ3zngkOdteYWytx5Qr4XKNs6R-Myyq72KUp02mJDZiiyiglxML_i3-_CeecCw",
    e: "AQAB",
};
var signature = hexStringToUint8Array("3119faeed99f4ef0516f9f8e8429bf9bd98aba7d0a89a8ca9331513094f4a2ab9cfdc003d618ef10254263b5631355d8a5a0bb082584f33db8da8a1f9283c2ee70c821d0feac3d7e63b0c612fb9aef003000a423b650e80858b2eb8b4cea8f61822344f816dc1f325c305e3d547f6b19f172703b47639d41c84dce94b33b58a3a9b6c0b6a5ce43087cc0ed2a06e5c525cdaa80d856c1e4316a792ad4af795936594c35c985c11c3eb2bb37013d2e3ce67a74664ef58bbf0b0f16e2b68d29180006b6a17abd95c444aac723ac7213d57bea714882c6c8b139ef007d6157dea01d8d2573aef64ac912958aeae7fa1b59633c8526220d7db6a8e362774243156a01");

crypto.subtle.importKey("jwk", jwkKey, rsaImportParams, extractable, ["verify"]).then(function(key) {
    return crypto.subtle.verify({ name: "RSA-PSS", saltLength: 16 }, key, signature, text);
}).then(function(result) {
    verified = result;

    shouldBeTrue("verified");

    finishJSTest();
});
