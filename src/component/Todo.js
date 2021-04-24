import React ,{useEffect, useState} from 'react'
import logo from '../images/todo.svg'
import "../App.css"



const Todo =()=>{
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState([]);


    const addItem =()=>{
            console.log(inputData)
            if(inputData){
                setItems([...items,inputData])
                setInputData("");
        }
    }
    const deleteItem=(id)=>{
    const updateItem= items.filter((ele,idx)=>
    {
    return idx !==id;
    })
    setItems(updateItem)
    }
    const removeAll=()=>{
        setItems([]);
    }
    useEffect(()=>{
        localStorage.setItem('lists',JSON.stringify(items))
    })

    return(
        <div className="main-div">
            <div className="child-div">
                <figure>
                <img src={logo} alt="Todo App"/>
                <figcaption>Add Items To The List</figcaption>
                </figure>
                <div className="add-item">
                    <input type="text" placeholder=" Add Items...✍"
                    value={inputData}
                    onChange={(e)=>setInputData(e.target.value)}
                    />
                    <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i>
                </div>
                <div className="showItems">
                {
                            items.map((elem, ind) => {
                                return (
                                    <div className="eachItem" key={ind}>
                                        <h3>{ elem }</h3>
                                        <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteItem(ind)}></i>
                                    </div>
                                )
                            })

                }


                </div>
                <div className="showItems">
                    <button className="btn effect04" data-sm-link-text="Delete All" onClick={removeAll}><span>Check List</span> </button>
                </div>
            </div>
        </div>)
}

export default Todo;