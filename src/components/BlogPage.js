import React from 'react';
import useTitle from '../customHooks/useTitle';

const BlogPage = () => {
    useTitle('Blogs');
    return (
        <div className='px-3 my-12 max-w-7xl mx-auto' style={{ minHeight: '90vh' }}>
            <div className='grid md:grid-cols-2 gap-x-5 gap-y-8'>
                <div className='max-w-2xl text-justify'>
                    <h2 className='text-xl font-semibold py-3'>Difference between NoSQL and MySQL</h2>
                    <p>Both SQL and NoSQL Databases have their set of advantages and disadvantages. SQL databases can be considered when you are looking for data consistency, reliability, integrity, and when the data is structured. NoSQL databases are a much better option if the data is large, semi-structured, or unstructured and you are looking for faster storage and retrieval of data.</p>
                </div>
                <div className='max-w-2xl text-justify'>
                    <h2 className='text-xl font-semibold py-3'>JSON Web Token</h2>
                    <p>JWT, or JSON Web Token, is an open standard(RFC 7519) set of claims to share security information or authorization/authentication requests between a client and a server. Each JWT contains encoded JSON objects. JWTs are signed using a cryptographic algorithm by the token’s issuer to ensure that No one could alter the claims after the token is issued and later can be used by the receiving party to verify the token.</p>
                </div>
                <div className='max-w-2xl text-justify'>
                    <h2 className='text-xl font-semibold py-3'>Difference between NodeJS and JavaScript</h2>
                    <p>JWT, or JSON Web Token, is an open standard(RFC 7519) set of claims to share security information or authorization/authentication requests between a client and a server. Each JWT contains encoded JSON objects. JWTs are signed using a cryptographic algorithm by the token’s issuer to ensure that No one could alter the claims after the token is issued and later can be used by the receiving party to verify the token.</p> <br />
                    <p>The Node or Node.js usually represents a collection of methods and objects available to the JavaScript code when run in V8 or through the node interpreter. This is a JS library cum runtime. Furthermore, if you know about Java then Java is to JRE is to JVM in the same way JavaScript is to Node is to V8.</p>
                </div>
                <div className='max-w-2xl text-justify'>
                    <h2 className='text-xl font-semibold py-3'>How NodeJS handle multiple requests at the same time</h2>
                    <p>NodeJS Web Server maintains a limited Thread Pool to provide services to client requests. Multiple clients make multiple requests to the NodeJS server. NodeJS receives these requests and places them into the EventQueue . <br />
                        NodeJS server has an internal component referred to as the EventLoop which is an infinite loop that receives requests and processes them. This EventLoop is single threaded. In other words, EventLoop is the listener for the EventQueue. <br />
                        So, we have an event queue where the requests are being placed and we have an event loop listening to these requests in the event queue. What happens next?
                        The listener(the event loop) processes the request and if it is able to process the request without needing any blocking IO operations, then the event loop would itself process the request and sends the response back to the client by itself. <br />
                        If the current request uses blocking IO operations, the event loop sees whether there are threads available in the thread pool, picks up one thread from the thread pool and assigns the particular request to the picked thread. That thread does the blocking IO operations and sends the response back to the event loop and once the response gets to the event loop, the event loop sends the response back to the client.</p>
                </div>
            </div>
        </div>
    );
};



export default BlogPage;