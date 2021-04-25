import React ,{useEffect, useState} from 'react'
import logo from '../images/todo.svg'
import "../App.css"
// to get the data from Local Storages

const getLocalItmes = () => {
    let list = localStorage.getItem('lists');
    console.log(list);

    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}


const Todo =()=>{
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItmes());
    const[toggleSubmit,setToggleSubmit]=useState(true);
    const[isEdit,setEdit]=useState(null);
    const addItem =()=>{
        if (!inputData)
        {
            alert("Please enter data");
        }
        else if (inputData && !toggleSubmit){
            setItems(
                items.map((elem)=>{
                    if(elem.id===isEdit){
                        return {...elem,name:inputData}
                    }
                    return elem
                })
            )
            setToggleSubmit(true);
            setInputData(" ")
            setEdit(null);
        }    
        else{
                const allInputs={id: new Date().getTime().toString(),name:inputData}
                setItems([...items,allInputs])
                setInputData("");
        }
    }
    //For Item Deletion
    const deleteItem=(idex)=>{
    const updateItem= items.filter((ele)=>
    {
    return idex !==ele.id;
    })
    setItems(updateItem)
    }

    const editItem=(index)=>{
        
        console.log("This is the "+index)
        let editing=items.find((elem)=>{
            return elem.id===index;
        });
       // console.log(editing.name+" : ---- :")
        setToggleSubmit(false);
        setInputData(editing.name)
        setEdit(index);
    }


    // Deleting all the items
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
                    onChange={(e)=>setInputData(e.target.value)}/>
                    { toggleSubmit ?<i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i>
                        :<i className="fa fa-edit add-btn" title="Add Item" onClick={addItem}></i>
                        }
                </div>
                <div className="showItems">
                {
                            items.map((elem) => {
                                return (
                                    <div className="eachItem" key={elem.id}>
                                        <h3>{ elem.name }</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit " title="Edit Items" onClick={() => editItem(elem.id)}></i>
                                            <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteItem(elem.id)}></i>
                                        </div>
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