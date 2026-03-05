// import { Link } from "react-router-dom";
// import { useState } from "react";
// // import logo from "../../assets/images/src/assets/images/49fff.png";
// import logo from "../../assets/images/49fff.png"

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav className="fixed top-0 left-0 w-full px-6 py-3 md:px-10 md:py-4 z-50
//   bg-white/40 backdrop-blur-2xl border-b border-white/20
//   flex items-center justify-between  ">
      
//       {/* Logo */}
//       <h1 className="text-4xl md:text-4xl text-green-900 font-bold font-[Cormorant_Garamond] tracking-wide">
//         <img className="h-30" src={logo} />
//       </h1>
//       {/* font-serif font that changed */}

//       {/* Desktop Menu */}
//       <ul className="hidden md:flex gap-10 text-lg font-light ">
//         <Link to="/home" className="hover:opacity-70">Home</Link>
//         <Link to="/about" className="hover:opacity-70">About</Link>
//         <Link to="/portfolio" className="hover:opacity-70">Portfolio</Link>
//         <Link to="/testimonials" className="hover:opacity-70">Wedding Films</Link>
//         <Link to="/contact" className="hover:opacity-70">Contact Us</Link>
//       </ul>

//       {/* Mobile Hamburger */}
//       <button
//         className="md:hidden mt-15 text-3xl font-bold"
//         onClick={() => setMenuOpen(!menuOpen)}
//       >
//         {menuOpen ? "✖" : "☰"}
//       </button>

//       {/* Mobile Dropdown */}
//       <div
//   className={`absolute left-0 w-full bg-white/70 backdrop-blur-xl 
//     md:hidden transition-all duration-500 ease-out overflow-hidden
//     rounded-b-2xl border-b border-white/40
//     ${menuOpen ? "max-h-40 opacity-100 top-36" : "max-h-0 opacity-0 top-12"}
//   `}
// >
//   <ul className="flex flex-row flex-wrap justify-center font-[Cormorant_Garamond]   items-center gap-5 text-lg font-medium py-4 px-5">
//     <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
//     <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
//     <Link to="/portfolio" onClick={() => setMenuOpen(false)}>Portfolio</Link>
//     <Link to="/testimonials" onClick={() => setMenuOpen(false)}>Wedding Films</Link>
//     <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
//   </ul>
// </div>
//     </nav>
//   );
// }
// 0


import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/images/49fff.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY) {
        // scrolling down
        setShowNav(false);
      } else {
        // scrolling up
        setShowNav(true);
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        px-6 py-3 md:px-10 md:py-4
        bg-white/40 backdrop-blur-2xl border-b  border-white/20
        flex items-center justify-between
        transition-transform duration-500 
        ${showNav ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      {/* Logo */}
      {/* <img src={logo} className="h-24 md:h-16" alt="Logo" /> */}
      <div>
        <h1 className="text-4xl" style={{fontFamily:"Seasons"}}>Vowframe</h1>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-10  text-lg font-light ">
        <Link to="/home" className="hover:opacity-70">Home</Link>
        <Link to="/about" className="hover:opacity-70">About</Link>
        <Link to="/Portfolio" className="hover:opacity-70">Portfolio</Link>
        <Link to="/Gallery" className="hover:opacity-70">Gallery</Link>
        <Link to="/testimonials" className="hover:opacity-70">Wedding Films</Link>
        <Link to="/contact" className="hover:opacity-70">Contact Us</Link>
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-3xl font-bold"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✖" : "☰"}
      </button>

      {/* Mobile Dropdown */}
      <div
        className={`
          absolute left-0 w-full bg-white/70 backdrop-blur-xl
          md:hidden transition-all duration-500 ease-out overflow-hidden
          rounded-b-3xl border-b border-white/40 mt-14
          ${menuOpen ? "max-h-40 opacity-100 top-16" : "max-h-0 opacity-0 top-10"}
        `}
      >
      <ul className="flex flex-row flex-wrap justify-center font-[Cormorant_Garamond]   items-center gap-5 text-lg font-medium py-4 px-5">
     <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
     <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
     <Link to="/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link>
     <Link to="/portfolio" onClick={() => setMenuOpen(false)}>Portfolio</Link>
     <Link to="/testimonials" onClick={() => setMenuOpen(false)}>Wedding Films</Link>
     <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
   </ul>
      </div>
    </nav>
  );
}
