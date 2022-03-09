pragma solidity 0.8.0;

/**
 * @title Bank contract interface
 * @notice the main equation for this is making compound value calculation
 * @notice the default period is one year 
 */
interface IBank {

    /**
     * @notice Player wants to make estimation of his equipment.
     * @param equipment_id the id of the equipment.
     * @return value the estimated value of equipment, default time is one year.
     */
    function estimate(uint256 equipment_id) public returns(unit256 value);

    /**
     * @notice Player stakes his equipment.
     * @param equipment_id the id of the equipment.
     * in this function, the owner of this equipment should change
     * @return value the real value of equipment after one period time based on the real time (block.timestamp).
     */
    function stake(uint256 equipment_id) public payable returns(unit256 value);

    /**
     * @notice Get in-time compound value.
     * @param equipment_id the id of the equipment.
     * @return compoundResult return the compound result based on the equation. 
     * equation: value = equipment value / index; index = (1 + x)^n; (1 + x)^365 = APY; default APY is 130%
     */
    function get_compound(uint256 equipment_id) private returns(unit256 compoundResult);

    /**
     * @notice Player does withdrawl after one period time.
     * @param equipment_id the id of the equipment.
     * in this function, the owner of this equipment should change back to the player.
     * @return value the real value of equipment after one period time.
     */
    function withdraw(uint256 equipment_id) public payable returns(unit256 value);
    
    /**
     * @notice Player wants to withdrawl in an emergency. Will lose 75% of the reward compared with normal process.
     * @param equipment_id the id of the equipment.
     * in this function, the owner of this equipment should change back to the player.
     * @return value the value of equipment (with only 25% reward) after one period time.
     */
    function withdraw_emergency(uint256 equipment_id) public payable returns(unit256 value);


    /**
     * @notice Only admin can update the index for getting the accurate compound everyday
     * @param input are the the id of the equipment and the index value.
     * no output
     * require(msg.sender == admin);
     */
    function updateIndex_Admin(uint256 equipment_id, uint256 index) public ;

    /**
     * @notice Everyone can view the index value for thinking whether to stake equipment
     * @param input is the equipment id 
     * @return the real-time index of the equipment, using it can calculate the value.
     */
    function viewIndex(uint256 equipment_id) public view returns(uint256 index);

}
