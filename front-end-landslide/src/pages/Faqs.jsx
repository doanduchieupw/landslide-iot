import { useState } from 'react';

const Faqs = () => {
    const [faqs, setFaqs] = useState([
        {
            question: 'Sạt lở đất là gì ?',
            answer: 'Sạt lở đất là sự di chuyển của một khối đá, một tầng đất, những khối mãnh vụn của đất đá rời rạc nhau. Trượt xuống một con dốc trên triền núi, đồi, thậm chí một địa tầng.',
            open: true,
        },
        {
            question: 'Dấu hiệu nhận biết sạt lở đất ?',
            answer: `- Mưa nhiều ngày/mưa lớn.
                     - Vết nứt tường nhà, sườn đồi, mái dốc, cây nghiêng, nước sông, suối từ trong chuyển màu thành nước đục
                     - Mặt đất phồng lên, cây cối rung chuyển, âm thanh lạ trong lòng đất.
                     `,
            open: false,
        },
        {
            question:
                'Cần phải làm gì ?',
            answer: `   - Theo dõi thông tin cảnh báo lũ quét, sạt lở đất. Thông báo cho chính quyền và những người xung quanh khi có dấu hiệu 
                        - Sẵn sàng sơ tán theo hướng dẫn của chính quyền địa phương.
                        - Chạy nhanh ra khỏi nơi nguy hiểm khi nghe hoặc nhận thấy tiếng động lớn hoặc dấu hiệu không bình thường
            `,
            open: false,
        },
        {
            question:
                'Theo dõi thông tin sạt lở đất ở đâu ?',
            answer: `http://canhbaotruotlo.vn/`,
            open: false,
            type: 'link'
        },
    ]);

    const tongleFAQS = (index) => {
        setFaqs(
            faqs.map((faq, idx) => {
                faq.open = idx === index ? !faq.open : false;
                return faq;
            })
        );
    };

    return (
        <div className='flex flex-col items-center mt-5'>
            <span className="text-4xl font-bold text-royal-blue mb-2">FAQS</span>
            {faqs.map((faq, idx) => (
                <div key={idx} className='w-3/5'>
                    <div
                        className='px-5 py-3 shadow-md bg-royal-blue opacity-80 text-white rounded-md mb-4 cursor-pointer hover:opacity-100'
                        onClick={() => tongleFAQS(idx)}
                    >
                        {faq.open ? (
                            <span className='font-extrabold'> {'-'} </span>
                        ) : (
                            <span className='font-extrabold'> {'+'} </span>
                        )}
                        {faq.question}
                    </div>
                    {faq.open && (
                        <div className='-mt-3 mb-6 px-5 py-3 rounded-md shadow-md bg-slate-400 an'>
                            {faq.type === 'link' ? <a href={faq.answer}>{faq.answer}</a> : faq.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Faqs;
