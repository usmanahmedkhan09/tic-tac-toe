import React from "react";

class TicToe extends React.Component
{
    state = {
        boxValue: null,
        currentPlayer: null,
        playerOne: "X",
        playertwo: "O",
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        gameOver: false
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
            this.setState({
                gameOver: true
            })
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
        setTimeout(() => this.checkWinner(), 500);
    };
    render()
    {
        let Conatiner = null
        let board = this.state.data.map((item, index) =>
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
        if (this.state.gameOver)
        {
            Conatiner = <>
                <span className="winner">{this.state.currentPlayer}</span>
                <div style={{ fontSize: 32 + 'px', position: 'absolute', top: 4.5 + 'em', left: -24, fontWeight: 'bold', color: 'rgb(82, 79, 79)' }}>WINNER!</div>
            </>
        } else
        {
            Conatiner =
                <>
                    <div className="players-info">
                        <div className={`player-one ${this.state.currentPlayer === 'O' ? 'border-bottom' : ''}`}>{this.state.playerOne}</div>
                        <div className={`player-two ${this.state.currentPlayer === 'X' ? 'border-bottom' : ''}`}>{this.state.playertwo}</div>
                    </div>
                    <div className="Container">
                        {board}
                    </div>
                </>


        }
        return (
            <div style={{ position: "relative" }}>
                {Conatiner}
            </div>
        );
    }
}

export default TicToe;
