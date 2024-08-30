import  './index.css';

export default function Index(){
    return (
        <div className="container">
        <header className="header">
            <h1>University of Delhi</h1>
            <h2>Welcome to MY DU News App</h2>
        </header>

        <section className="about-du">
            <h3>About University of Delhi</h3>
            <p>
                Established in 1922, the University of Delhi is one of India's largest and most esteemed educational institutions. Known for its rigorous academic programs and a vibrant campus life, DU is a hub of intellectual and cultural activities.
            </p>
            <p>
                With over 90 affiliated colleges spread across Delhi, the university offers a vast array of courses, making it a preferred choice for students from all over the country. Whether you're looking to pursue Arts, Science, Commerce, or any other field, Delhi University provides unparalleled opportunities for learning and growth.
            </p>
            <ul>
                <li>Over 90 affiliated colleges</li>
                <li>Diverse range of undergraduate and postgraduate programs</li>
                <li>Strong network of alumni</li>
                <li>Host to numerous cultural and academic events</li>
            </ul>
        </section>

        <section className="about-app">
            <h3>About MY DU News App</h3>
            <p>
                MY DU News App is the go-to platform for anyone connected with the University of Delhi. Whether you are a student, faculty member, or simply interested in keeping up with DU's latest happenings, this app has everything you need.
            </p>
            <p>
                Stay informed with real-time updates on admissions, exam schedules, results, and campus events. The app also features dedicated sections for placement updates, club activities, and important announcements from the university administration.
            </p>
            <ul>
                <li>Live updates on admissions and exams</li>
                <li>Instant notifications on results and academic events</li>
                <li>Coverage of campus news and cultural events</li>
                <li>Access to placement information and opportunities</li>
                <li>Direct communication from university administration</li>
            </ul>
            <p>
                Download MY DU News App today and stay connected with everything happening at the University of Delhi.
            </p>
        </section>

        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} MY DU News App. All rights reserved.</p>
        </footer>
    </div>
    );
}

