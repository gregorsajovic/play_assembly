const fs = require("fs")
const hre = require("hardhat")

async function saveHre() {
    const serializableHre = Object.keys(hre).reduce((acc, key) => {
        try {
            acc[key] = JSON.parse(JSON.stringify(hre[key]))
        } catch (error) {
            acc[key] = `Error: ${error.message}`
        }
        return acc
    }, {})
    fs.writeFileSync("hre.json", JSON.stringify(serializableHre, null, 2))

    console.log("Saved hre to hre.json")
}

saveHre().catch(console.error)
