const hre = require("hardhat")

async function main() {
    const [test] = process.argv[2]
    console.log(test)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
