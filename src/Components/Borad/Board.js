import React from "react";

class TicToe extends React.Component
{
    state = {
        boxValue: null,
        currentPlayer: null,
        playerOne: "X",
        playertwo: "O",
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };

    checkWinner = (index) =>
    {
        let nextmove = true;
        let board = this.state.data;
        let lines = [
            // checking rows
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            // checking columns
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            // checking dignoal
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < lines.length; i++)
        {
            let [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[b] === board[c])
            {
                nextmove = false;
            }
        }
        if (nextmove)
        {
            this.nextMove(index);
        } else
        {
            console.log("winner");
        }
    };
    nextMove = () =>
    {
        let arr = [];
        if (this.state.currentPlayer)
        {
            this.state.data.forEach((item, index) =>
            {
                if (item !== "X" && item !== "O") arr.push(index);
            });
        }
        let Cindex = arr[Math.floor(Math.random() * arr.length)];
        this.setState((prevState) =>
        {
            let item = { ...prevState }; // creating copy of state variable
            item.data[Cindex] = "O";
            item.currentPlayer = "O"; // update the name property, assign a new value
            return item; // return new object
        });
    };

    mouseClick = (index) =>
    {
        this.setState((prevState) =>
        {
            let item = { ...prevState }; // creating copy of state variable
            item.data[index] = "X";
            item.currentPlayer = "X"; // update the name property, assign a new value
            return item; // return new object
        });
        setTimeout(() => this.checkWinner(), 1000);
    };
    render()
    {
        let row = this.state.data.map((item, index) =>
        {
            let ItemClass = item === "X" || item === "O" ? "darkColor" : "liteColor";
            return (
                <div
                    onClick={() => this.mouseClick(index)}
                    className={`child  ${ItemClass}`}
                    key={index}
                >
                    {item}
                </div>
            );
        });
        return (
            <>
                {/* <span>{this.state.currentPlayer}</span> */}
                <div className="Container">
                    {/* <div> */}
                    {row}
                    {/* </div> */}
                </div>
            </>
        );
    }
}

export default TicToe;
