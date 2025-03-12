const hre = require("hardhat")

async function main() {
    const [networkName, test, proba, vaja] = process.argv.slice(2)

    // const networkName = process.argv[2]
    console.log("This should be network name: ", networkName)

    if (!networkName || !test || !proba || !vaja) {
        console.error("Usage: node ./scripts/argTestScript.js <network> ...")
        process.exit(1)
    }

    await hre.run("compile")
    await hre.network.provider.request({ method: "hardhat_reset" })

    const networkConfig = hre.config.networks[networkName]

    console.log(networkConfig.url)
    console.log(networkConfig())
    console.log(test)
    console.log(proba)
    console.log(vaja)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
