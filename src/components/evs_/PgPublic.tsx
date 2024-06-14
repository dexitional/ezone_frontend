import React, { useEffect, useState } from 'react'
import Service from '../../utils/evsService'
import { useLoaderData } from 'react-router';
import { Chart } from "react-google-charts";

export async function loader({ params }){
  const data = await Service.fetchVotes(params.electionId);
  return { data }
}

function PgPublic() {
  
  const { data }:any = useLoaderData();
  const [chartData, setChartData] = useState(data?.portfolios);
  const [pageview, setPageview] = useState(0);

  
  const getChartData = (index) => {
    var data = [["Candidate", "Votes"]];
    const dm:any = chartData?.find((r,i) => i == index);
    if (dm) {
      const dmx:any = dm?.candidates?.filter((r) => r.votes > 0).sort((a, b) => b.votes - a.votes);
      for (var i = 0; i < dmx.length; i++) {
        const d = dmx[i];
        //const n = [d.tag && d.tag.toUpperCase(),d.votes]
        const n = [`LEADER ${i + 1}`, d.votes];
        data.push(n);
      }
    }
    return data;
  };

  const changeView = () => {
    setTimeout(() => {
      const index = (pageview + 1) % (chartData?.length);
      setPageview(index);
    }, 5000);
  };

  const syncData = async () => {
    const resp = await Service.fetchVotes(data?.election?.id);
    if (resp) {
      resp.portfolios && setChartData(resp.portfolios);
    }
  };

  
  useEffect(() => {
    setInterval(() => syncData(), 10000);
    changeView();
  }, []);

  useEffect(() => {
    changeView();
  }, [pageview]);
  
  return (
    <div className="py-3 px-3 flex-1 h-full rounded bg-[#f1f1f1]/30 shadow-inner shadow-gray-500/30 space-y-3 md:space-y-6">
        <h1 className="px-4 py-2.5 text-base md:text-xl rounded bg-primary/80 font-semibold font-noto text-white ">PUBLIC MONITOR</h1>
        <div className="py-2     md:py-4 px-2 rounded shadow-inner shadow-gray-500/20 bg-white space-y-4">
            {/* <h2 className="px-6 py-1 rounded text-xs md:text-lg text-center text-blue-950 font-extrabold tracking-widest bg-slate-200/70">TEACHING REPRESENTATIVE</h2> */}
            <div className="pt-2 flex items-center justify-center space-x-2">
              { chartData?.map((row:any, i:number) => 
                <div className={`h-4 w-4 md:h-6 md:w-6 rounded-full border-4 ${pageview == i ? 'bg-primary/80':'bg-slate-100'} `}></div>
              )}
            </div>
            { chartData?.map((row:any, i:number) => 
               pageview == i ? (
              <div className="p-2 md:px-3 md:py-3 bg-zinc-200/50 shadow-inner space-y-2 md:space-y-4">
                <h3 className="px-6 py-3.5 bg-white text-xs md:text-lg md:text-left text-center rounded shadow-inner shadow-gray-500/20 font-semibold text-red-900">{row?.title?.toUpperCase()}</h3>
                <div className="px-4 py-4 bg-white text-xl rounded">
                  {/* Charts */}
                  <Chart
                    key={i}
                    chartType="PieChart"
                    data={ getChartData(i) }
                    options={{ is3D: true }}
                    width={"100%"}
                    height={"400px"}
                  />
                </div>
              </div>
            ): null )}
        </div>
    </div>
  )
}

export default PgPublic