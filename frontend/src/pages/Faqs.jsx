import { useEffect } from "react";
import Navbar from "../components/navbar";
import Fade from "../components/Fade";
import { useNavigate } from "react-router-dom";

const faqs = {
  questions: [
    {
      question: "What is MochaMentors?",
      answer:
        "MochaMentors is an online platform that connects students with industry professionals to facilitate meaningful coffee chats.",
    },
    {
      question: "What is the goal of MochaMentors?",
      answer:
        "Our goal is to create an inclusive and engaging platform where students can connect with industry professionals over causal meaningful conversations. We aim to foster mentorship, exchange knowledge and build networks that empower students to explore career opportunities and personal growth.",
    },
    {
      question: "How can I get involved?",
      answer:
        "You can get involved by signing up as a mentor or mentee on our platform. You can also follow us on social media and share our platform with your friends.",
    },
    {
      question: "How can I become a mentor?",
      answer:
        "You can become a mentor by signing up on our platform and creating a profile. From there, you can then connect with eager students and begin guiding them on their professional journey. Start mentoring today, and make an impact that lasts! ",
    },
    {
      question: "How can I become a mentee?",
      answer:
        "Join our platform as a mentee by signing up and creating your profile. Once you're set up, you can connect with mentors and start receiving valuable guidance.",
    },
    {
      question: "How can I contact MochaMentors?",
      answer: "You can contact MochaMentors by sending us an email at mochamentors@example.com.",
    },
  ],
};

function Faqs() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/homepage");
    }
  }, []);

  return (
    <main className="min-h-screen w-screen bg-base-color text-mocha-color">
      <Navbar />
      <div className="w-full bg-darker-nav-color py-10">
        <Fade>
          <h1 className="text-5xl font-extrabold text-center text-black tracking-widest">
            Frequently Asked Questions
          </h1>
        </Fade>
      </div>
      <div className="w-full bg-nav-color py-16">
        <Fade>
          <div className="container mx-auto px-6 lg:px-20">
            {faqs.questions.map((faq, index) => (
              <div
                key={index}
                className="mb-8 p-6 bg-white shadow-lg rounded-lg transition-transform hover:scale-105"
              >
                <h2 className="text-2xl font-semibold text-mocha-color mb-4">
                  {faq.question}
                </h2>
                <p className="text-lg leading-relaxed text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </main>
  );
}

export default Faqs;
