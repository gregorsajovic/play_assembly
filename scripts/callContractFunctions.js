// const hre = require("hardhat")

const { artifacts } = require("hardhat")

async function deployMemAbiEnc(hre, taskArgs) {
    // Manually access the command-line arguments
    console.log(taskArgs)
    // const { networkName, contractName, contractAddress, mappedAddress, slt } =
    const {
        mappedAddress,
        nubmerVal,
        slotLocation,
        networkName,
        contractName,
        contractAddress,
    } = taskArgs

    console.log("Network name: ", networkName)
    console.log("Contract name: ", contractName)
    console.log("Contract address: ", contractAddress)
    console.log("Parameter mapped address: ", mappedAddress)
    console.log("Numerical value: ", nubmerVal)
    console.log("Read the value at slot: ", slotLocation)

    if (!networkName || !contractName || !contractAddress || !mappedAddress) {
        console.log("Error: Missing required arguments.")
        console.log(
            "Usage: npx hardhat run ./scripts/callContractFunctions.js <networkName> <contractName> <contractAddress> <mappedAddress>"
        )
        process.exit(1)
    }

    // Load Hardhat environment manually
    await hre.run("compile") // Ensure contracts are compiled
    await hre.network.provider.request({ method: "hardhat_reset" }) // Reset network if needed

    // Set up provider and signer for the specified network
    const networkConfig = hre.config.networks[networkName]
    if (!networkConfig) {
        console.error(
            `Èrror: Network "${networkName}" not found in hardhatArguments.config.js `
        )
        process.exit(1)
    }

    console.log("GanacheB private key: ", process.env.PK_GANACHE_B)
    // Use the private key and provider to get the signer
    const provider = new hre.ethers.JsonRpcProvider(networkConfig.url)
    const signer = new hre.ethers.Wallet(process.env.PK_GANACHE_B, provider)

    console.log("Signer:", signer.address)
    console.log("Network url si: ", networkConfig.url)

    // Retrieve the contract ABI
    const artifact = await hre.artifacts.readArtifact(contractName)

    // Instantiate the contract
    const contract = new hre.ethers.Contract(
        contractAddress,
        artifact.abi,
        signer
    )
    // console.log(contract)

    // Example: Calling a contract function with the provided parameter
    let [slot, addrSlot1, addrSlot2, addrLoc, addrVal] =
        await contract.memAbiEnc(mappedAddress)
    console.log(
        "Returned Values:",
        slot,
        addrSlot1,
        addrSlot2,
        addrLoc,
        Number(addrVal)
    )
}

async function getContract(hre, networkName, contractName, contractAddress) {
    if (!networkName || !contractName || !contractAddress) {
        console.log("Error: Missing required arguments.")
        console.log(
            "Usage: npx hardhat run ./scripts/callContractFunctions.js <networkName> <contractName> <contractAddress> "
        )
        process.exit(1)
    }

    let netPK
    switch (networkName) {
        case "ganacheA":
            netPK = process.env.PK_GANACHE_A
            break
        case "ganacheB":
            netPK = process.env.PK_GANACHE_B
            break
        default:
            netPK = process.env.PK_HARDHAT
            break
    }

    const networkConfig = new hre.config.networks[networkName]()
    const provider = new hre.ethers.JsonRpcProvider(networkConfig.url)
    const signer = new hre.ethers.Wallet(netPK, provider)
    const artifacts = await hre.artifact.readArtifact(contractName)

    const contract = hre.ethers.Contract(contractAddress, artifacts.abi, signer)

    return contract
}

async function deploySaveNumberAtSlot(hre, taskArgs) {
    const {
        mappedAddress,
        nubmerVal,
        slotLocation,
        networkName,
        contractName,
        contractAddress,
    } = taskArgs

    const contract = await getContract(
        hre,
        networkName,
        contractName,
        contractAddress
    )

    let { savedAddress, sltLoc } = await contract.saveNumberAtSlot(
        mappedAddress,
        nubmerVal
    )
}

async function deployTestPrintSlot(hre, taskArgs) {
    const {
        mappedAddress,
        nubmerVal,
        slotLocation,
        networkName,
        contractName,
        contractAddress,
    } = taskArgs
}

module.exports = {
    deployMemAbiEnc,
    deploySaveNumberAtSlot,
    deployTestPrintSlot,
}

// deploy()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error)
//         process.exit(1)
//     })
