const { task } = require("hardhat/config")

task("params", "A sample task with params")
    .addPositionalParam("param1", "This is first parameter")
    .addPositionalParam("param2", "This is second parameter")
    .addOptionalPositionalParam("param3", "This is optional parameter")
    .addOptionalParam(
        "param4",
        "This is fourth parameter and it should be optional",
        1,
        types.int
    )
    .addOptionalParam("test5", "Testiram kako to dela")
    .setAction(async (taskArgs) => {
        console.log(taskArgs)
        return taskArgs
    })

/**
     * @author: Gregor Sajovic
     * @dev to run it: 
     *                  npx hardhat params prvi drugi tretji --param4 3 --test5 peti
     * result:
     * {
            param4: 3,
            test5: 'peti',
            param1: 'prvi',
            param2: 'drugi',
            param3: 'tretji'
        }     
     * 
     * or: npx hardhat params prvi drugi tretji
     * result:
     * {
            param4: 1,
            test5: undefined,
            param1: 'prvi',
            param2: 'drugi',
            param3: 'tretji'
        }
     */
