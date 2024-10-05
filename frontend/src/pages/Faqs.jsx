import React from "react";
import Navbar from "../components/navbar";
import Fade from "../components/Fade";

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
  return (
    <main className="h-auto w-auto">
      <Navbar />
      <div className="w-screen h-screen overflow-auto">
        <div className="flex items-center justify-center w-full h-1/2 relative bg-darker-nav-color">
          <Fade>
            <h1 className="text-4xl text-black font-bold text-center">
              Frequently Asked Questions
            </h1>
          </Fade>
        </div>
        <div className="w-full min-h-1/2 bg-nav-color flex-grow h-auto ">
          <Fade>
            <div className="container mx-auto py-10 flex items-center justify-center flex-col ">
              {faqs.questions.map((faq, index) => (
                <div key={index} className="mb-4 lg:h-48 h-auto gap-2 w-3/5">
                  <h2 className="text-2xl font-bold">{faq.question}</h2>
                  <p className="text-lg ">{faq.answer}</p>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </div>
    </main>
  );
}

export default Faqs;
