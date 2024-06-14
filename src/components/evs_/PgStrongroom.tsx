import React, { useEffect, useState } from 'react'
import Service from '../../utils/evsService'
import { useLoaderData } from 'react-router';
import { Chart } from "react-google-charts";


function PgStrongroom() {

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
		  const n = [d?.tag && d?.tag.toUpperCase(),d?.votes]
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
        <h1 className="px-4 py-2.5 text-base md:text-xl rounded bg-primary/80 font-semibold font-noto text-white ">STRONGROOM MONITOR</h1>
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

export default PgStrongroom


{/*



{
	"data":
	[
		{
			"id": 6265,
			"tag": "SN/NUS/22/0079",
			"name": "JENNIFER ANKOMAH ANSONG",
			"gender": null,
			"vote_time": "2023-07-10 08:45:47",
			"vote_status": 1,
			"vote_sum": "166,169,174,172,178,181",
			"hash": null,
			"election_id": 51
		},
		{
			"id": 6266,
			"tag": "SN/NUS/22/0136",
			"name": "JOSEPHINE  ADU",
			"gender": null,
			"vote_time": "2023-07-10 08:55:07",
			"vote_status": 1,
			"vote_sum": "166,169,174,172,178,180",
			"hash": null,
			"election_id": 51
		},
		{
			"id": 6267,
			"tag": "SN/NUS/22/0062",
			"name": "GLADYS  OPPONG",
			"gender": null,
			"vote_time": "2023-07-10 08:58:13",
			"vote_status": 1,
			"vote_sum": "166,169,175,172,177,180",
			"hash": null,
			"election_id": 51
		},
		{
			"id": 6268,
			"tag": "SN/NUS/22/0112",
			"name": "DEBORAH KWAKYEWAH OPOKU",
			"gender": null,
			"vote_time": "2023-07-10 09:20:00",
			"vote_status": 1,
			"vote_sum": "166,169,174,172,178,181",
			"hash": null,
			"election_id": 51
		},
		{
			"id": 6269,
			"tag": "SN/NUS/21/0062",
			"name": "ADAM ZANGBEO MAMUDU",
			"gender": null,
			"vote_time": "2023-07-10 09:42:28",
			"vote_status": 1,
			"vote_sum": "167,170,174,172,178,181",
			"hash": null,
			"election_id": 51
		},
		{
			"id": 6270,
			"tag": "SN/NUS/20/0025",
			"name": "DESMOND  ASAMOAH-TAKYI",
			"gender": null,
			"vote_time": "2023-07-10 09:50:55",
			"vote_status": 1,
			"vote_sum": "166,170,174,172,178,181",
			"hash": null,
			"election_id": 51
		},
		{
			"id": 6271,
			"tag": "SN/NUS/21/0150",
			"name": "IDA  ADIYIAH",
			"gender": null,
			"vote_time": "2023-07-10 12:42:58",
			"vote_status": 1,
			"vote_sum": "166,169,175,172,177,181",
			"hash": null,
			"election_id": 51
		},
		{
			"id": 6272,
			"tag": "SN/NUS/20/0048",
			"name": "REUBEN  BOADU",
			"gender": null,
			"vote_time": "2023-07-10 13:40:51",
			"vote_status": 1,
			"vote_sum": "166,170,174,172,178,181",
			"hash": null,
			"election_id": 51
		},
		{
			"id": 6273,
			"tag": "SN/NUS/20/0090",
			"name": "PRINCE TETTEY NARH",
			"gender": null,
			"vote_time": "2023-07-10 14:01:24",
			"vote_status": 1,
			"vote_sum": "166,170,174,172,178,181",
			"hash": null,
			"election_id": 51
		},
		{
			"id": 6274,
			"tag": "SN/NUS/21/0152",
			"name": "PRINCE  ODARTEY",
			"gender": null,
			"vote_time": "2023-07-10 14:03:54",
			"vote_status": 1,
			"vote_sum": "167,169,175,173,177,180",
			"hash": null,
			"election_id": 51
		},
		{
			"id": 7604,
			"tag": "SN/NUS/20/0129",
			"name": "BERNICE ABENA DARKEY",
			"gender": null,
			"vote_time": "2023-07-14 08:48:45",
			"vote_status": 1,
			"vote_sum": "166,170,174,172,178,181",
			"hash": null,
			"election_id": 51
		},
		{
			"id": 7605,
			"tag": "SN/NUS/21/0148",
			"name": "EUNICE BOAMAA KYEI",
			"gender": null,
			"vote_time": "2023-07-14 08:49:44",
			"vote_status": 1,
			"vote_sum": "166,169,175,172,177,180",
			"hash": null,
			"election_id": 51
		},
		{
			"id": 7606,
			"tag": "SN/NUS/20/0045",
			"name": "ABIANA AKUA POKUA-BOSOMPEM",
			"gender": null,
			"vote_time": "2023-07-14 08:50:34",
			"vote_status": 1,
			"vote_sum": "166,170,174,172,178,181",
			"hash": null,
			"election_id": 51
		},
		{
			"id": 7607,
			"tag": "SN/MID/22/0024",
			"name": "CHRISTABEL  KWARTENG",
			"gender": null,
			"vote_time": "2023-07-14 08:50:39",
			"vote_status": 1,
			"vote_sum": "166,170,174,172,178,181",
			"hash": null,
			"election_id": 51
		},
		{
			"id": 7608,
			"tag": "SN/NUS/20/0117",
			"name": "MIRABEL  ATTAKORA-YEBOAH",
			"gender": null,
			"vote_time": "2023-07-14 08:50:48",
			"vote_status": 1,
			"vote_sum": "166,170,174,172,178,181",
			"hash": null,
			"election_id": 51
		},
		{
			"id": 7609,
			"tag": "SN/NUS/20/0013",
			"name": "MARGARET SERWAA OPOKU",
			"gender": null,
			"vote_time": "2023-07-14 08:51:24",
			"vote_status": 1,
			"vote_sum": "166,170,174,172,178,181",
			"hash": null,
			"election_id": 51
		},
		{
			"id": 7610,
			"tag": "SN/MID/22/0053",
			"name": "PRECIOUS DELALI AMU",
			"gender": null,
			"vote_time": "2023-07-14 08:51:28",
			"vote_status": 1,
			"vote_sum": "166,169,174,172,178,181",
			"hash": null,
			"election_id": 51
		},
		{
			"id": 7611,
			"tag": "SN/NUS/19/0105",
			"name": "ESTHER  ASARE",
			"gender": null,
			"vote_time": "2023-07-14 08:51:41",
			"vote_status": 1,
			"vote_sum": "166,171,176,172,178,182",
			"hash": null,
			"election_id": 51
		},
		{
			"id": 7612,
			"tag": "SN/NUS/21/0015",
			"name": "DAVID  AKLADE",
			"gender": null,
			"vote_time": "2023-07-14 08:52:03",
			"vote_status": 1,
			"vote_sum": "167,169,175,172,177,180",
			"hash": null,
			"election_id": 51
		},
		{
			"id": 7613,
			"tag": "SN/NUS/20/0087",
			"name": "AUGUSTINE AGYEMANG BOAKYE",
			"gender": null,
			"vote_time": "2023-07-14 08:52:53",
			"vote_status": 1,
			"vote_sum": "166,170,174,172,178,181",
			"hash": null,
			"election_id": 51
		},
		{
			"id": 7614,
			"tag": "SN/NUS/22/0054",
			"name": "RONALD  AGYEMAN",
			"gender": null,
			"vote_time": "2023-07-14 08:53:22",
			"vote_status": 1,
			"vote_sum": "166,169,175,172,178,181",
			"hash": null,
			"election_id": 51
		},
		{
			"id": 7615,
			"tag": "SN/NUS/22/0122",
			"name": "AARON EKOW JUNIOR ABORABORA",
			"gender": null,
			"vote_time": "2023-07-14 08:53:25",
			"vote_status": 1,
			"vote_sum": "168,169,175,172,178,181",
			"hash": null,
			"election_id": 51
		},
		{
			"id": 7616,
			"tag": "SN/NUS/20/0017",
			"name": "YVONNE ANIMA TUFFOUR",
			"gender": null,
			"vote_time": "2023-07-14 08:53:51",
			"vote_status": 1,
			"vote_sum": "166,170,174,172,178,181",
			"hash": null,
			"election_id": 51
		},
		{
			"id": 7617,
			"tag": "SN/NUS/20/0127",
			"name": "GIFTY OBENG KANKAM",
			"gender": null,
			"vote_time": "2023-07-14 08:54:29",
			"vote_status": 1,
			"vote_sum": "166,170,174,172,178,181",
			"hash": null,
			"election_id": 51
		},
		{
			"id": 7618,
			"tag": "SN/NUS/20/0006",
			"name": "BARBARA SERWAA AWUAKYE",
			"gender": null,
			"vote_time": "2023-07-14 08:55:20",
			"vote_status": 1,
			"vote_sum": "166,170,174,172,178,181",
			"hash": null,
			"election_id": 51
		},
		{
			"id": 7619,
			"tag": "SN/NUS/22/0106",
			"name": "NANA KOBINA ASAKORA QUAYE",
			"gender": null,
			"vote_time": "2023-07-14 08:57:16",
			"vote_status": 1,
			"vote_sum": "166,169,174,172,178,181",
			"hash": null,
			"election_id": 51
		}
	]
}




============================


6265	SN/NUS/22/0079	JENNIFER ANKOMAH ANSONG	NULL	2023-07-10 08:45:47	1	166,169,174,172,178,181	NULL	51
6266	SN/NUS/22/0136	JOSEPHINE  ADU	NULL	2023-07-10 08:55:07	1	166,169,174,172,178,180	NULL	51
6267	SN/NUS/22/0062	GLADYS  OPPONG	NULL	2023-07-10 08:58:13	1	166,169,175,172,177,180	NULL	51
6268	SN/NUS/22/0112	DEBORAH KWAKYEWAH OPOKU	NULL	2023-07-10 09:20:00	1	166,169,174,172,178,181	NULL	51
6269	SN/NUS/21/0062	ADAM ZANGBEO MAMUDU	NULL	2023-07-10 09:42:28	1	167,170,174,172,178,181	NULL	51
6270	SN/NUS/20/0025	DESMOND  ASAMOAH-TAKYI	NULL	2023-07-10 09:50:55	1	166,170,174,172,178,181	NULL	51
6271	SN/NUS/21/0150	IDA  ADIYIAH	NULL	2023-07-10 12:42:58	1	166,169,175,172,177,181	NULL	51
6272	SN/NUS/20/0048	REUBEN  BOADU	NULL	2023-07-10 13:40:51	1	166,170,174,172,178,181	NULL	51
6273	SN/NUS/20/0090	PRINCE TETTEY NARH	NULL	2023-07-10 14:01:24	1	166,170,174,172,178,181	NULL	51
6274	SN/NUS/21/0152	PRINCE  ODARTEY	NULL	2023-07-10 14:03:54	1	167,169,175,173,177,180	NULL	51
7604	SN/NUS/20/0129	BERNICE ABENA DARKEY	NULL	2023-07-14 08:48:45	1	166,170,174,172,178,181	NULL	51
7605	SN/NUS/21/0148	EUNICE BOAMAA KYEI	NULL	2023-07-14 08:49:44	1	166,169,175,172,177,180	NULL	51
7606	SN/NUS/20/0045	ABIANA AKUA POKUA-BOSOMPEM	NULL	2023-07-14 08:50:34	1	166,170,174,172,178,181	NULL	51
7607	SN/MID/22/0024	CHRISTABEL  KWARTENG	NULL	2023-07-14 08:50:39	1	166,170,174,172,178,181	NULL	51
7608	SN/NUS/20/0117	MIRABEL  ATTAKORA-YEBOAH	NULL	2023-07-14 08:50:48	1	166,170,174,172,178,181	NULL	51
7609	SN/NUS/20/0013	MARGARET SERWAA OPOKU	NULL	2023-07-14 08:51:24	1	166,170,174,172,178,181	NULL	51
7610	SN/MID/22/0053	PRECIOUS DELALI AMU	NULL	2023-07-14 08:51:28	1	166,169,174,172,178,181	NULL	51
7611	SN/NUS/19/0105	ESTHER  ASARE	NULL	2023-07-14 08:51:41	1	166,171,176,172,178,182	NULL	51
7612	SN/NUS/21/0015	DAVID  AKLADE	NULL	2023-07-14 08:52:03	1	167,169,175,172,177,180	NULL	51
7613	SN/NUS/20/0087	AUGUSTINE AGYEMANG BOAKYE	NULL	2023-07-14 08:52:53	1	166,170,174,172,178,181	NULL	51
7614	SN/NUS/22/0054	RONALD  AGYEMAN	NULL	2023-07-14 08:53:22	1	166,169,175,172,178,181	NULL	51
7615	SN/NUS/22/0122	AARON EKOW JUNIOR ABORABORA	NULL	2023-07-14 08:53:25	1	168,169,175,172,178,181	NULL	51
7616	SN/NUS/20/0017	YVONNE ANIMA TUFFOUR	NULL	2023-07-14 08:53:51	1	166,170,174,172,178,181	NULL	51
7617	SN/NUS/20/0127	GIFTY OBENG KANKAM	NULL	2023-07-14 08:54:29	1	166,170,174,172,178,181	NULL	51
7618	SN/NUS/20/0006	BARBARA SERWAA AWUAKYE	NULL	2023-07-14 08:55:20	1	166,170,174,172,178,181	NULL	51
7619	SN/NUS/22/0106	NANA KOBINA ASAKORA QUAYE	NULL	2023-07-14 08:57:16	1	166,169,174,172,178,181	NULL	51


*/}