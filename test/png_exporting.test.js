const fs = require('fs');
const path = require('path');
const PSD = require('../');
const outputPath = path.join(__dirname, "output");
const fixturesPath = path.join(__dirname, "fixtures");

describe("exporting from a PSD", () => {
    const psdPath = path.join(__dirname, "../examples/images/example.psd");
    const filePath = path.join(outputPath, "out.png");
    const expectedPath = path.join(fixturesPath, "out.png");

    beforeEach(() => {
        !fs.existsSync(outputPath) && fs.mkdirSync(outputPath);
    });

    afterEach(() => {
        fs.existsSync(filePath) && fs.unlinkSync(filePath);
    });

    test("should export a png file", () => {
        return PSD.open(psdPath).then(psd => {
            return psd.image.saveAsPng(filePath);
        }).then(() => {
            expect(fs.statSync(filePath).size).toBe(fs.statSync(expectedPath).size);
        });
    });
});
