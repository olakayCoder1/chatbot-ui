// import React, { useState, useRef, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import NEATSupportBot from './NEATSupportBot'; // Import the NEATSupportBot component

// // Define types for our data structures
// interface Message {
//   type: 'user' | 'bot';
//   text: string;
//   time: Date;
// }

// function App(): JSX.Element {
//   const [messages, setMessages] = useState<Message[]>([
//     { type: 'bot', text: "Welcome to NEAT Financial Support! How can I help you with your loan today?", time: new Date() }
//   ]);
//   const [input, setInput] = useState<string>('');
//   const [suggestions, setSuggestions] = useState<string[]>([]);
//   const [isTyping, setIsTyping] = useState<boolean>(false);
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);
//   const neatBot = useRef<NEATSupportBot>(new NEATSupportBot());

//   const scrollToBottom = (): void => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     // Set initial suggestions
//     setSuggestions(neatBot.current.getFollowUpSuggestions('general'));
//   }, []);

//   interface ConversationResult {
//     botResponse: string;
//     suggestedQueries: string[];
//   }

//   interface SubmitEvent extends React.FormEvent<HTMLFormElement> {
//     currentTarget: HTMLFormElement;
//   }

//   interface ButtonEvent extends React.MouseEvent<HTMLButtonElement> {
//     currentTarget: HTMLButtonElement & {
//       dataset: {
//         suggestion?: string;
//       };
//     };
//   }

//   const handleSubmit = async (e?: SubmitEvent | ButtonEvent): void => {
//     e?.preventDefault();
//     if (!e) return;
    
//     const isButtonClick = 'dataset' in e.currentTarget;
//     if ((!input.trim() && !isButtonClick) || (isButtonClick && !e.currentTarget.dataset.suggestion)) return;

//     const userQuery = isButtonClick ? e.currentTarget.dataset.suggestion || '' : input;
    
//     // Add user message
//     setMessages(prev => [...prev, { type: 'user', text: userQuery, time: new Date() }]);
//     setInput('');
    
//     // Simulate bot typing
//     setIsTyping(true);
    
//     // Process with bot (with realistic delay)
//     setTimeout(() => {
//       const result = simulateConversation(userQuery);
//       setMessages(prev => [...prev, { type: 'bot', text: result.botResponse, time: new Date() }]);
//       setSuggestions(result.suggestedQueries);
//       setIsTyping(false);
//     }, 1000);
//   };

//   const simulateConversation = (userQuery: string): ConversationResult => {
//     const response = neatBot.current.handleQuery(userQuery);
//     const topic = neatBot.current.identifyTopic(userQuery.toLowerCase());
//     const suggestions = neatBot.current.getFollowUpSuggestions(topic);
    
//     return {
//       botResponse: response,
//       suggestedQueries: suggestions
//     };
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-blue-600 text-white p-4 shadow-md">
//         <div className="container mx-auto flex items-center">
//           <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-3 shadow">
//             <span className="text-blue-600 font-bold text-lg">N</span>
//           </div>
//           <div>
//             <h1 className="text-xl font-bold">NEAT Financial Support</h1>
//             <p className="text-sm opacity-80">Loan Support Chatbot</p>
//           </div>
//         </div>
//       </header>
      
//       {/* Chat Container */}
//       <div className="flex-1 overflow-y-auto p-4">
//         <div className="container mx-auto max-w-2xl">
//           {messages.map((msg, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3 }}
//               className={`mb-4 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
//             >
//               <div className={`max-w-xs md:max-w-md rounded-lg p-3 ${
//                 msg.type === 'user' 
//                   ? 'bg-blue-600 text-white rounded-br-none' 
//                   : 'bg-white text-gray-800 shadow rounded-bl-none'
//               }`}>
//                 <p className="text-sm">{msg.text}</p>
//                 <p className="text-xs mt-1 opacity-70 text-right">
//                   {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
          
//           {isTyping && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="flex justify-start mb-4"
//             >
//               <div className="bg-white text-gray-800 rounded-lg p-3 shadow rounded-bl-none max-w-xs">
//                 <div className="flex space-x-2">
//                   <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
//                   <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '200ms' }}></div>
//                   <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '400ms' }}></div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
          
//           <div ref={messagesEndRef} />
//         </div>
//       </div>
      
//       {/* Suggestions */}
//       {suggestions.length > 0 && (
//         <div className="bg-white border-t border-gray-200 p-3">
//           <div className="container mx-auto max-w-2xl">
//             <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
//             <div className="flex flex-wrap gap-2">
//               {suggestions.map((suggestion, index) => (
//                 <motion.button
//                   key={index}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.2, delay: index * 0.1 }}
//                   className="bg-gray-100 hover:bg-gray-200 text-sm px-3 py-1 rounded-full text-gray-700"
//                   data-suggestion={suggestion}
//                   onClick={handleSubmit as any}
//                 >
//                   {suggestion}
//                 </motion.button>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Input Form */}
//       <div className="bg-white border-t border-gray-200 p-4 shadow-inner">
//         <div className="container mx-auto max-w-2xl">
//           <form onSubmit={handleSubmit as any} className="flex items-center gap-2">
//             <input
//               type="text"
//               value={input}
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
//               placeholder="Type your question here..."
//               className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <motion.button
//               whileTap={{ scale: 0.95 }}
//               type="submit"
//               className="bg-blue-600 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-blue-700"
//               disabled={!input.trim()}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//               </svg>
//             </motion.button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;