const { task, types } = require("hardhat/config")
// const deploy = require("../scripts/callContractFunctions")

task("deployTest", "Testing deployment with different parameters")
    .addPositionalParam(
        "networkName",
        "With this you select network for contract deployment.",
        "hardhat",
        types.string
    )
    .addPositionalParam(
        "contractName",
        "Specify contract name that you want to deploy.",
        "asseTest",
        types.string
    )
    .addPositionalParam(
        "contractAddress",
        "Specify contract address.",
        "",
        types.string
    )
    .addOptionalParam(
        "mappedAddress",
        "Mapped address for specific number value."
    )
    .addOptionalParam("nubmerVal", "Numeric value, to be stored into mapping.")
    .addOptionalParam("slotLocation", "Slot location for retriving the value.")
    .setAction(async (taskArgs, hre) => {
        console.log(taskArgs)
        try {
            console.log("Starting deployment from task!")
            hre.run("compile")
            const deploy = require("../scripts/callContractFunctions")
            let deployed = await deployScript(
                hre,
                taskArgs.mappedAddress,
                taskArgs.numberVal,
                taskArgs.slotLocation,
                taskArgs.networkName,
                taskArgs.contractName,
                taskArgs.contractAddress
            )
            console.log("Deployment finished successfully: ", deployed)
        } catch (error) {
            console.error("Deployment failed: ", error)
            process.exit(1)
        }
    })
