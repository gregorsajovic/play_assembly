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
        "mappedaddress",
        "Mapped address for specific number value.",
        "test",
        types.string
    )
    .addOptionalParam(
        "nubmerval",
        "Numeric value, to be stored into mapping.",
        0,
        types.int
    )
    .addOptionalParam(
        "slotlocation",
        "Slot location for retriving the value.",
        "",
        types.string
    )
    .setAction(async (taskArgs, hre) => {
        // console.log(taskArgs)
        try {
            console.log("Starting deployment from task!")
            hre.run("compile")
            const {
                deployMemAbiEnc,
                deploySaveNumberAtSlot,
                deployTestPrintSlot,
            } = require("../scripts/callContractFunctions")
            // await deployMemAbiEnc(hre, taskArgs)
            await deploySaveNumberAtSlot(hre, taskArgs)
            console.log(deploySaveNumberAtSlot)
            console.log("Deployment finished successfully.")
        } catch (error) {
            console.log("A smo tu?")
            console.error("Deployment failed: ", error)
            process.exit(1)
        }
    })
