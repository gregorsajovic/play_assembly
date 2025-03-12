const { task, types } = require("hardhat/config")
const { string } = require("yargs")
const { deploy } = require("../scripts/callContractFunctions")

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
    .setAction(async (taskArgs) => {
        console.log(taskArgs)
        await deploy(taskArgs)
        console.log("Deployment finished.")
    })
