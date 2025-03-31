// const hre = require("hardhat")

// const { network } = require("hardhat")

// const { artifacts } = require("hardhat")

async function deployMemAbiEnc(hre, taskArgs) {
    // Manually access the command-line arguments
    console.log(taskArgs)
    // const { networkName, contractName, contractAddress, mappedAddress, slt } =
    const {
        mappedaddress,
        nubmerval,
        slotlocation,
        networkName,
        contractName,
        contractAddress,
    } = taskArgs

    console.log("Network name: ", networkName)
    console.log("Contract name: ", contractName)
    console.log("Contract address: ", contractAddress)
    console.log("Parameter mapped address: ", mappedaddress)
    console.log("Numerical value: ", nubmerval)
    console.log("Read the value at slot: ", slotlocation)

    if (!networkName || !contractName || !contractAddress || !mappedaddress) {
        console.log("Error: Missing required arguments.")
        console.log(
            "Usage: npx hardhat run ./scripts/callContractFunctions.js <networkName> <contractName> <contractAddress> <mappedaddress>"
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
        await contract.memAbiEnc(mappedaddress)
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
    console.log("Creating contract with network: ", netPK)

    let networkConfig
    try {
        networkConfig = hre.config.networks[networkName]
    } catch {
        console.log(error)
        process.exit(1)
    }
    // console.log("Network config narejen: ", networkConfig)
    if (!networkConfig) {
        console.error(
            `Èrror: Network "${networkName}" not found in hardhatArguments.config.js `
        )
        process.exit(1)
    }
    const provider = new hre.ethers.JsonRpcProvider(networkConfig.url)
    const signer = new hre.ethers.Wallet(netPK, provider)
    console.log("Contract name: ", contractName)
    // Retrieve the contract ABI
    let artifact
    try {
        console.log("test A")
        artifact = await hre.artifacts.readArtifact(contractName)

        console.log("test B", artifact)
    } catch (error) {
        console.error("Error reading artifact: ", error)
        console.trace()
        process.exit(1)
    }
    console.log("Za artifactom: ", artifact)

    // Instantiate the contract
    const contract = new hre.ethers.Contract(
        contractAddress,
        artifact.abi,
        signer
    )
    console.log("Contract created: ", contract)
    return contract
}

async function testArtifact(hre, networkName, contractName, contractAddress) {}

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
    console.log("Pred klicom pogodbe: ", contract)
    let { savedAddress, sltLoc } = await contract.saveNumberAtSlot(
        mappedAddress,
        nubmerVal
    )
    console.log(
        "Here are address where the value is saved: %s, and the slot location where is saved: %s",
        savedAddress,
        sltLoc
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
