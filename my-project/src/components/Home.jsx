const Home = () => {
  return (
    <div className="hero min-h-screen bg-gray-300">
  <div className="hero-content flex-col lg:flex-row">
    <img src="https://picsum.photos/200/300" className="max-w-sm rounded-lg shadow-2xl" />
    <div className="flex flex-col items-center justify-center ">
  <h1 className="text-5xl font-bold">Welcome to AIQuiz!</h1>
  <p className="py-6 text-8xs text-center">
    Unlock the world of knowledge and fun with AIQuiz, your go-to platform for creating, sharing, and participating in quizzes. Explore a diverse range of quizzes crafted by educators, enthusiasts, and experts. From science and technology to literature and entertainment, there's a quiz for everyone.
  </p>
  <button onClick={() => window.location.href = '/SignUp'} className="btn btn-primary">Get Started</button>
</div>

  </div>
</div>
  );
};

export default Home;