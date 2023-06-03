import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
   display: flex;
   flex-direction: column; 
   align-items: center;
   margin: 30px 0 10px;

`;
const BalanceBox = styled.div`
  display:flex;
  flex-direction: row; 
  justify-content: space-between;
  align-items: center;
`;
const AddTransaction = styled.button`
    background: black;
    color: white;
    margin: 5px 20px;
    padding: 5px 5px;
   
`;
const AddTransactionContainer = styled.div`
 display: flex;
 flex-direction: column;
 padding: 15px 20px;
 margin: 10px 20px;
 border: 1px solid #e6e8e9;
 gap: 8px;
 width:100%;


 & input{
    outline: none;
    padding: 10px 12px;
    border: 1px solid #e6e8e9;
    border-radius: 4px;
 }
`;
const RadioBox = styled.div`
 display: flex;
 margin: 0px 30px;
 align-items: center;
`;

const ExpenseContainer = styled.div`
   display:flex;
   flex-direction:row;

   gap: 12px;
   margin: 20px;
`;
const ExpenseBox = styled.div`
   display:flex;
   flex-direction:column;
   border-radius:4px;
   border: 1px solid #e6e8e9;
   padding: 15px 20px;
   width: 135px;
   gap: 12px;
& span{
    font-weight:bold;
    font-size: 20px;
    color: ${props=> props.isIncome? 'green':'red'};
}
   
  
`;
const AddTransactionView = (props) =>{
    const [amount, setAmount] = useState();
    const [Desc, setDesc] = useState()
    const[type, setType] = useState("Expense")

    const addTransaction = () =>{
        props.addTransaction({amount:Number(amount),Desc,type, id:Date.now(),});
        props.toggleAddTrans(); // taking this value as props from parent component that is overview component
    };
  
    return(
     <AddTransactionContainer>
        <input placeholder="Amount" value={amount} type="number" onChange={(e)=>setAmount(e.target.value)} />
        <input placeholder="Description" value={Desc} onChange={(e)=>setDesc(e.target.value)}/>
        <RadioBox>
            
            <input type='radio' id='expense' name='type'value="EXPENSE" checked={type==="EXPENSE"}onChange={(e)=>setType(e.target.value)}/>
            <label htmlFor="expense" >Expense</label>
            <input type='radio' id='income' value="INCOME" checked={type==="INCOME"} onChange={(e)=>setType(e.target.value)} />
            <label htmlFor="income">Income</label>
            
        </RadioBox>
        <AddTransaction onClick={addTransaction} >Add Transaction</AddTransaction>
     </AddTransactionContainer>
    )
}

const OverviewComponent = (props) =>{
   const [istransVisible, toggleAddTrans]=useState(true)
   return(
    <Container>
        <BalanceBox>
            Balance:${props.income - props.expense}
            <AddTransaction onClick={()=>toggleAddTrans(!istransVisible)}>{istransVisible ? "Cancel":"Add"}</AddTransaction>
        </BalanceBox>
        {istransVisible && <AddTransactionView toggleAddTrans={toggleAddTrans} addTransaction={props.addTransaction}  /> }
        <ExpenseContainer>
           <ExpenseBox isIncome={false}>
              Expense<span>{props.expense}</span>
           </ExpenseBox>
           <ExpenseBox isIncome={true}>
              Income<span>{props.income}</span>
           </ExpenseBox>
             
        </ExpenseContainer>
    </Container>
   )
};
export default OverviewComponent;