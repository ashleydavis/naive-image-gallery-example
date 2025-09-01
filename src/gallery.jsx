import React, { useState, useEffect } from 'react';

function generateImages() {
  const imageNames = [
    '-otamb-hEPM.jpeg',
    '0vAVnZj9rWs.jpeg',
    '1iyr-vrB15k.jpeg',
    '2Dr0zG6DUrg.jpeg',
    '2cU7KHi9LqU.jpeg',
    '2kLhltQ83GY.jpeg',
    '2qjPlJKnZ6M.jpeg',
    '2rciqMXWj_c.jpeg',
    '2z-iBclu2Ls.jpeg',
    '39_tauA0RxE.jpeg',
    '4fMr2hAC78U.jpeg',
    '5BqkuC-f_4w.jpeg',
    '5SazmKgRYnw.jpeg',
    '5vnqUmoTIVA.jpeg',
    '5ycFuf6Gp0I.jpeg',
    '6PKw0t-wm0M.jpeg',
    '7eN-ZxxBbag.jpeg',
    '9Bs33_xwbHQ.jpeg',
    '9ZBUc9z7Vmw.jpeg',
    'AJZ_75RTpL0.jpeg',
    'AO6BYTEnlMo.jpeg',
    'B1jAP16tQzw.jpeg',
    'BVyzjR1AcOI.jpeg',
    'D0m9WVJPd6M.jpeg',
    'DCewUNZOjnc.jpeg',
    'Dh24FR2BJjg.jpeg',
    'DlfP_KJK5dM.jpeg',
    'GBU2L01Yx-M.jpeg',
    'G_w2LWtxp-4.jpeg',
    'Hco_4haT5bM.jpeg',
    'Hsz-XurVaTE.jpeg',
    'HuvxHRcOY6E.jpeg',
    'HxtvH28DSVM.jpeg',
    'I-UYQjG6MRA.jpeg',
    'IN7ShB2Ci7g.jpeg',
    'IduY1QsDWBc.jpeg',
    'J6T78kdQXIQ.jpeg',
    'JU5bvIaIYA8.jpeg',
    'KIVqJrp1y1M.jpeg',
    'KM_2rd1Psxg.jpeg',
    'KiL79wI17L4.jpeg',
    'KjTq4yjnSgc.jpeg',
    'L6DAsk88-F4.jpeg',
    'LMucLDY2Amk.jpeg',
    'LTIrGbdmCgk.jpeg',
    'M-UDGT4GWCs.jpeg',
    'MC5rlVvpqYo.jpeg',
    'MrF48GjKUmA.jpeg',
    'MrbedyH1-jg.jpeg',
    'N5eixlmvUjM.jpeg',
    'Ngj2u4PHjBY.jpeg',
    'NhoC7vngLYs.jpeg',
    'O0smoxgLIqA.jpeg',
    'P4WII5uYjAY.jpeg',
    'PvWExixS3_4.jpeg',
    'Qxm4RUNPCyg.jpeg',
    'SKlj7Az8DCQ.jpeg',
    'TUzFT0Is3U4.jpeg',
    'ThAVTOvwyGY.jpeg',
    'TosMsZW747A.jpeg',
    'TxP6Gpic6jI.jpeg',
    'USUTuczx96I.jpeg',
    'U_lZQfczRRw.jpeg',
    'UgFmm-WCeO0.jpeg',
    'WafibCOuqk4.jpeg',
    'WtNk-Ab9JEY.jpeg',
    'XLv5iWdyC38.jpeg',
    'ZLms1AcFjMQ.jpeg',
    'ZTNcyb_6EVw.jpeg',
    '_U3u_8zsiIs.jpeg',
    'aj3KXG8Ytds.jpeg',
    'bYiJojtkHnc.jpeg',
    'bg5QBFoQEkg.jpeg',
    'bhE9jEgqZ04.jpeg',
    'bx54hnBo6UU.jpeg',
    'c_PH8OcePG0.jpeg',
    'coWE3JW5__I.jpeg',
    'dJt7EmomG78.jpeg',
    'gjXWsXJuHUw.jpeg',
    'gzCbLrXsag8.jpeg',
    'h49Rix3LBIE.jpeg',
    'hQ214dKDDKM.jpeg',
    'kgYcvtjrMR4.jpeg',
    'knrYooURWGA.jpeg',
    'l1ONpGNOZeE.jpeg',
    'lLwAGTESXEQ.jpeg',
    'mAU7mNvZebU.jpeg',
    'mBvyaLFKzaY.jpeg',
    'mm_aV4S5qQE.jpeg',
    'mv8UiLUHW2M.jpeg',
    'n7rwkoux8hc.jpeg',
    'nXxVdRsqVTA.jpeg',
    'ngKy_CKcqx4.jpeg',
    'oJ2Nq8aDqhg.jpeg',
    'pJ_yqFKXHds.jpeg',
    'pbCwQfQcU-Q.jpeg',
    'qQAGRlSzv2A.jpeg',
    'rJQZ1yYo-pg.jpeg',
    'rrbIdRwFtes.jpeg',
    'tA43SkziQYI.jpeg',
    'tdYjebqfR-c.jpeg',
    'txXfF_2YZpY.jpeg',
    'u5TvPiyfW8Q.jpeg',
    'uyQ5dXQq4sE.jpeg',
    'w-BSFRpfTWk.jpeg',
    'wAg0NlNOd4M.jpeg',
    'wH7J4LAkQ7M.jpeg',
    'wwVqpdal2Is.jpeg',
    'xD7MTFu17Lk.jpeg',
    'xIO0zH4F8pw.jpeg',
    'yIA3KpsJaNs.jpeg',
    'yZGhp7pR4qE.jpeg',
    'yf9DOemQ4vc.jpeg',
    'z9xJE03D988.jpeg'
  ];
  
  return imageNames.map(name => ({ thumb: `/${name}` }));
}

export function Gallery() {
  const [images, setImages] = useState(null);
  
  useEffect(() => {
    const sampleImages = generateImages();
    setImages(sampleImages);
  }, []);

  if (!images) {
    return <div>Loading...</div>;
  }

  return (
    <div 
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "10px"
      }}
    >
      {images.map((image, index) => {
        return (
          <img
            key={index}
            style={{
              height: "200px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }} 
            src={image.thumb} 
            alt={`Gallery image ${index + 1}`}
          />
        );
      })}
    </div>
  );
}