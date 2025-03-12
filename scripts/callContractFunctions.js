const hre = require("hardhat")

async function deploy(taskArgs) {
    // Manually access the command-line arguments
    const [networkName, contractName, contractAddress, mappedAddress, slt] =
        taskArgs
    // process.argv.slice(2)

    console.log("Network name: ", networkName)
    console.log("Contract name: ", contractName)
    console.log("Contract address: ", contractAddress)
    console.log("Parameter mapped address: ", mappedAddress)
    console.log("Read the value at slot: ", slt)

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

    let value = await contract.testPrintSlot(slt)
    console.log("Slot returns the value: ", Number(value))
}

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
