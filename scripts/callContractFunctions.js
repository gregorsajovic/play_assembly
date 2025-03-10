const hre = require("hardhat")

async function main() {
    // Manually access the command-line arguments
    const [contractName, contractAddress, param1] = process.argv.slice(2)

    if (!contractName || !contractAddress || !param1) {
        console.log("Error: Missing required arguments.")
        console.log(
            "Usage: npx hardhat run ./scripts/callContractFunctions.js <contractName> <contractAddress> <param1>"
        )
        process.exit(1)
    }

    console.log("Contract name:", contractName)
    console.log("Contract address:", contractAddress)
    console.log("Parameter 1:", param1)

    // Retrieve the contract ABI
    const artifact = await hre.artifacts.readArtifact(contractName)
    const abi = artifact.abi

    // Use the private key and provider to get the signer
    const signer = new hre.ethers.Wallet(
        process.env.PK_GANACHE_B,
        hre.ethers.provider
    )
    console.log("Signer:", signer.address)

    // Instantiate the contract
    const contract = new hre.ethers.Contract(contractAddress, abi, signer)

    // Example: Calling a contract function with the provided parameter
    let [, , , , addrVal] = await contract.memAbiEnc(param1)
    console.log("Returned Value:", addrVal)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
