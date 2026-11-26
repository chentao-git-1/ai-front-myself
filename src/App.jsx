
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
        "http://localhost:8080/api/chat",
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
        const data = await response.json();
        // TODO 3：将后端回复添加到 messages 数组
        setMessages(prev => [...prev, data]);

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
