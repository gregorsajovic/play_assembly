const { ethers, network } = require("hardhat")

async function main() {
    console.log("start deploying contract")
    const AssemblyTest = await ethers.getContractFactory("AssemblyTest")
    const assemblyTest = await AssemblyTest.deploy()
    await assemblyTest.waitForDeployment()

    console.log("Contract deployed on $s network.", await network.config.url)
    console.log("... at address: $s", await assemblyTest.getAddress())
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
