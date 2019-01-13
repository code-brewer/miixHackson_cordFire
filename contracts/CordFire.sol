pragma solidity ^0.4.18;


contract CordFire {
    
    uint TIME_DELTA = 10*60;

    uint GAME_COST = 1000;
    
    struct OneGame {
        bytes32  cords; // 开赛的布局的hash值 H('xxx(1,2),(3,4),(5,6)')
        uint startTime;        
        byte status; // 0：not begin ; 1: begined; 2: normal ended!
        uint score;
    }
    
    mapping(address =>OneGame) private GamesHistory;
    mapping(address => OneGame) private GamesOngoing;  

    mapping(address => uint) private Deposits;  

    mapping(uint => uint) private playerScore;

    mapping(uint => bool) private unmatched_player; // (A,B)

    mapping(address => bytes32) public debug_info;  // 映射到 cords 


    event GameStart(address indexed player, bytes32 cordsHash); //logging the event after task gets added.
    
    event GameEnd(address indexed player, string score, string time); //logging the event after task gets added.
    
    event ReentryWarning(address indexed player, string msg);

    event LogValue(string flag,  address sender, uint aWei );
    event LogMsg(string flag,  address sender, string msg );

    address public owner = msg.sender;
    // constructor() public payable { owner = msg.sender; }

    modifier ownerOnly { require(owner == msg.sender); _; }

    function getCords(address player) 
        public view 
        returns (bytes32) {
            return debug_info[player];
        }

    function getNow() 
        view private 
        returns (uint256) {
            return now;   // 是unixtime， 以秒为单位！ 
        }

    /*
        允许多存， 每次只扣除固定的额度
    */
    function deposit() 
        public payable
        returns(address addr, uint amount) {
            uint prev = Deposits[msg.sender];
            Deposits[msg.sender] = prev + msg.value;    // TODO: use SafeMath lib
            address(this).transfer(msg.value);
            emit LogValue("AcceptDeposit",  msg.sender, msg.value );
            return (msg.sender, msg.value );
        }

    /*
        取出
    */
    function withDrawDeposit() 
        public 
        returns (bool successful) {
            uint left = Deposits[msg.sender];
            Deposits[msg.sender] = 0;
            address(msg.sender).transfer(left);
            return true;
        }

    /**
        游戏开始，将游戏盘上的布局上链
     */
    function startGame(address opponent, bytes32 cordsHash)//function for adding the task.
            public
            returns (bool successful) {
            debug_info[msg.sender] = cordsHash;
    
        if ( Deposits[msg.sender] < GAME_COST ) {        
            return false;
        }
        
        OneGame memory onGoingGame = GamesOngoing[msg.sender];
        if (onGoingGame.status == 1 && (now - onGoingGame.startTime) < TIME_DELTA ) { // 
            emit ReentryWarning(msg.sender, "还未退出上次对局~");
            return false;
        }
        else {
            GamesOngoing[msg.sender] = OneGame(cordsHash, now, 0, 0);
            emit GameStart(msg.sender, cordsHash);
            return true;
        }
    }

    /**
        游戏结束，对比哈希值，相同表示没有作弊，予以确认，并且进行激励结算（如果有的话）
     */
    function gameOver(address opponent, bytes32 cordsHash)//function for adding the task.
            public
            returns (bool successful) {
          
        OneGame storage onGoingGame = GamesOngoing[opponent];
        // delete onGoingGame[opponent]
        // delete onGoingGame[msg.sender]

        if (cordsHash == onGoingGame.cords) {
            emit LogMsg("gameOver: ", msg.sender, " win this game"); 
            // 结算
            return true;
        }
        return false;
    }

}
