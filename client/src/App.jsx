import { useEffect, useState } from "react";
import './index.css';

function App() {
  const[products,setProducts] = useState([]);
  const[newProduct,setNewProduct] = useState({});
  const [todoEl,setTodo]=useState({})
  const [isopen,setIsopen]=useState(false)
  useEffect(()=>{
    fetch('http://localhost:7070/api/products')
    .then(res=>res.json())
    .then(data=>{
      setProducts(data);
      setNewProduct({name:'',price:''})
    })
  },[])


  function handleSubmit(e){
    e.preventDefault();
    fetch('http://localhost:7070/api/products',{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body:JSON.stringify(newProduct)
    })
    setProducts([...products,newProduct]);
  }


  function handleEdit(e){
    e.preventDefault();
    fetch('http://localhost:7070/api/products',{
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body:JSON.stringify(newProduct)
    })
    setProducts([...products,newProduct]);
  }



  function handleChange(e){
    setNewProduct({...newProduct, [e.target.name]: e.target.value});
  }
  const editTodo=(todo)=>{
    setTodo(todo)
    setIsopen(true)
  }
  const exitModal =()=> {
    setIsopen(false)
  }
  return (
    <>
    <div className="big">
    <h1>To Do App</h1>
        {
     isopen ? (
      <form onSubmit={(e)=>handleEdit(e)} className="modal">
        <span onClick={()=>exitModal()} className="exit">X</span>
        <input onChange={(e)=>handleChange(e)} name="name" className="inp" type="text" placeholder={todoEl.name} />
        <button type="submit">Submit</button>
    </form>
     ) :(
      ""
     )
   }
   <form className="form" onSubmit={(e)=>handleSubmit(e)}>
           <input className="inpadd" onChange={(e)=>handleChange(e)} name="name" placeholder="Name" type="text"/>
           <button className="btn">Add ToDo</button>
        </form>
        <ul>
          {products && products.map((product)=>{
            return <li key={product.id}>
              {product.name}
              <button className="comp" onClick={(e)=>e.target.parentElement.style.textDecoration = "line-through"}>uncompleted</button>
              <button className="delete" onClick={()=>{
                if (window.confirm('are you sure to delete?')) {
                    fetch(`http://localhost:7070/api/products/${product.id}`,{
                      method:'DELETE'
                    })
                    setProducts(products.filter((pro)=>pro.id!==product.id))
                }
              }}><i className="fa-sharp fa-solid fa-trash"></i></button>
              <button className="edit" onClick={()=>editTodo(product)
              } ><i className="fa-solid fa-pen-to-square"></i></button>
              </li>
          })}
        </ul>
        
   
    </div>
    </>
  )
}

export default App
