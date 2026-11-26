
import './App.css'
import { useState } from 'react';

function App() {


  const [input, setInput] = useState("");



  const [messages, setMessages] = useState([]);

  const [loading,setLoading]=useState(false);

  const [error,seterror]=useState("");


async function sendMessage() {


  try {
     if (!input.trim()) {
        return;
    }

    seterror("");
    setLoading(true);

   

    const newMessage = {
        role: "user",
        content: input
    };

    setMessages(prev => [...prev, newMessage]);

    setInput("");

    

        // TODO 1：使用 fetch 发起 POST 请求
        // 地址：http://localhost:8080/api/chat
        // 请求参数：message
        // 提示：使用 newMessage.content
          const response = await fetch(
        "http://localhost:8080/api/chat/stream",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: newMessage.content
            })
        }
    );
    if (!response.ok) {
    throw new Error("HTTP错误：" + response.status);
}
    // TODO 1：获取 response.body 的读取器
    const reader = response.body.getReader();
    

    // TODO 2：创建 UTF-8 TextDecoder
    const decoder = new TextDecoder("utf-8");

    

    while (true) {

        // TODO 3：读取数据，获取 done 和 value
        const {done,value}=await reader.read();

        // TODO 4：如果 done 为 true，结束循环
        if(done==true)
          break;


        // TODO 5：将 value 解码为字符串

        let buffe="";

        buffe+= decoder.decode(value,{
          stream:true
        })
        const events = buffer.split(/\r?\n\r?\n/)

        // TODO 6：在控制台打印解码后的内容
        console.log(buffe);
}

    } catch (e) {
      console.log(e);
      seterror("请求出错，请检查网络");
    }finally{
      setLoading(false);
    }
}

  return (
    <>
      <section >  
        {/* <div >
          <button onClick={testbackend}>
            测试后端连接
          </button>
          <p>
            连接状态：{backendData?backendData.status : ("尚未连接")}

          </p>

          <p>
            后端名称：{backendData?backendData.service : ("尚未连接")}
          </p>
        </div> */}

        <div>
          <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage} disabled={loading}>{loading? "请求中":"发送"}</button>
          {messages.map((message, index) => (
            <p key={index}>{message.role}：{message.content}</p>
            ))}
            {error}
        </div>
      </section>

    </>
  )
}
export default App