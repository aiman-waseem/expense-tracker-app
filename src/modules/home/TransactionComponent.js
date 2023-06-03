import styled from "styled-components";
import { useEffect, useState } from "react";

const Container = styled.div`
   display: flex;
   flex-direction: column; 
   align-items: flex-start;
   margin: 30px 0 10px;
   padding: 10px 22px;
   gap: 10px;
   font-weight: bold;
   
& input{
   padding: 10px 12px;
   border-radius:12px;
   background: #e6e8e9;
   border: 1px solid #e6e8e9;
   outline: none;
   width:100%;
   

`;
const Cell = styled.div`
  display:flex;
  flex-direction:row;
  padding: 10px 15px;
  font-size: 14px;
  width: 100%;
  border-radius: 2px;
  border: 1px solid #e6e8e9;
  justify-content: space-between;
  font-weight: normal;
  border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
  
`;
const TransactionCell = (props) => {
  return(
   //To check the type of transaction(Expense or Income) to give color on border on right side
    <Cell isExpense={props.payload?.type === "EXPENSE"}>  
      <span> {props.payload.Desc} </span>
     <span> {props.payload.amount}  </span>
   </Cell>
  );
};

const TransactionComponent = (props) => {
   const [searchText, updatedSearchtext]= useState("");
   const [filteredtrans, updatedTrans]= useState(props.transactions);
   

   const filterData=(searchText)=>{
      if(!searchText || !searchText.trim().length){
         updatedTrans(props.transactions);
         return;
      }
      let txn= [... props.transactions];
      txn= txn.filter((payload)=>payload.Desc.toLowerCase().includes(searchText.toLowerCase().trim())
      );
      updatedTrans(txn);
   };

   useEffect(()=> filterData(searchText),[props.transactions]);

   return(
    <Container>Transactions
      <input placeholder="search"
       value={searchText}
        onChange={(e)=>{
         updatedSearchtext(e.target.value); 
         filterData(e.target.value);
         }}
      />
      {filteredtrans?.length? filteredtrans.map((payload)=>(<TransactionCell payload={payload}/> ))
      : "" } 
      {/* if transaction have some value we will iterate over those transactions using map() method other wise show wmpty string */}
   
    </Container>

   )
};
export default TransactionComponent;