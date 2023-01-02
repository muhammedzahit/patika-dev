import { useState } from "react";
import { CssBaseline, ThemeProvider} from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "./theme";
import FormComponent from "./components/FormComponent";
import Header from "./components/Header";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { getTransactions, createCampaign, getCampaigns, donateToCampaign, getBlockTimeStamp } from './Web3';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { type } from "@testing-library/user-event/dist/type";
import moment from 'moment';
import Web3 from "web3";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [sozlesmeId, setSozlesmeId] = useState('');
  const [campaignId, setCampaignId] = useState('');
  const [bagisMiktari, setBagisMiktari] = useState('');
  const [campaignOwner, setCampaignOwner] = useState('');
  const [deadline, setDeadline] = useState('');
  const [campaignTarget, setCampaignTarget] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [alert, setAlert] = useState(false);
  const [selectedDay, setSelectedDay] = useState(Date.now);

  
  const howManyDays = (date1, date2) => {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }


  function getDate(d)
  {
    return moment.unix(d).format("YYYY-MM-DD HH:mm:ss");
  }

  const handleAlert = (message, type) => {
    if(type === 'success'){
      setAlert(
        <Alert severity="success">
          <AlertTitle>{message}</AlertTitle>
        </Alert>
      )
    }
    else if(type === 'error'){
    setAlert(
    <Alert severity="error">
      <AlertTitle>{message}</AlertTitle>
    </Alert>)}

    setTimeout(() => {
      setAlert(false)
    }, 3000);
  }



  return (
    <Box m="20px" >
      {/* HEADER */}
      <Box display="flex" justifyContent="center" alignItems="center">
        <Header title="YÖNETİM PANELİ" subtitle="  Akıllı Sözleşme Yönetim Paneli" />
        <Box>
        </Box>
      </Box>

      {alert}

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        
        <FormComponent 
          text = 'Akıllı Sözleşme ID Ayarla'
          buttonText = 'ID Ayarla'
          inputs= {
          [
            {
              inputText: 'Sözleşme ID',
              inputValue: sozlesmeId,
              onChange: (e) => setSozlesmeId(e.target.value),
            }
          ]
          }
          gridColumn = 'span 4'
          gridRow = 'span 2'
          buttonAction={async (e) => {
            setCampaignId(sozlesmeId);
            let campaigns_ = await getCampaigns(sozlesmeId); 
            console.log(campaigns_)
            let transactions_ = await getTransactions(sozlesmeId);
            console.log(transactions_)
            setCampaigns(campaigns_);
            setTransactions(transactions_);
            handleAlert('Sözleşme ID ' + sozlesmeId + ' olarak ayarlandı', 'success');
          }}
        />

        <FormComponent 
          text = 'Kampanyaya Bağış Yap'
          buttonText = 'Bağış Yap'
          inputs= {
          [
            {
              inputText: 'Campaign ID',
              inputValue: campaignId,
              onChange: (e) => setCampaignId(e.target.value),
            },
            {
              inputText: 'Bağış Miktarı (ETH)',
              inputValue: bagisMiktari,
              onChange: (e) => setBagisMiktari(e.target.value),
            }
          ]
          }
          gridColumn = 'span 4'
          gridRow = 'span 2'
          buttonAction={async () => {
            if(!sozlesmeId){
              handleAlert('Lütfen önce sözleşme ID ayarlayın', 'error');
              return;
            }
            donateToCampaign(sozlesmeId,campaignId,bagisMiktari).then(async (res) => {
              if(res.status){
                handleAlert('Bağış başarılı', 'success');
              }
              else{
                handleAlert('Bağış başarısız', 'error');
              }
              let campaigns_ = await getCampaigns(sozlesmeId); 
              console.log(campaigns_)
              let transactions_ = await getTransactions(sozlesmeId);
              console.log(transactions_)
              setCampaigns(campaigns_);
              setTransactions(transactions_);
            });
          }}
        />

        <FormComponent 
          text = 'Kampanya Oluştur'
          buttonText = 'Oluştur'
          inputs= {
          [
            {
              inputText: 'Kampanya Sahibi',
              inputValue: campaignOwner,
              onChange: (e) => setCampaignOwner(e.target.value),
            },
            {
              inputText : 'Kampanya hedefi (ETH)',
              inputValue: campaignTarget,
              onChange: (e) => setCampaignTarget(e.target.value),
            }
            
          ]
          }
          date = {
            <div>
              <Box
              alignItems="center"
              justifyContent="center"
              display="flex"
              >
              <p>Deadline Tarihi</p>
              </Box>
            <DayPicker
              mode="single"
              selected={selectedDay}
              onSelect={(e) => {
              setDeadline(howManyDays(new Date(e), Date.now()));
              setSelectedDay(e);
              }}
              fromDate={new Date()}
            />
            </div>
            
          }
          gridColumn = 'span 4'
          gridRow = 'span 4'
          buttonAction={() => {
            if(!sozlesmeId){
              handleAlert('Lütfen önce sözleşme ID ayarlayın', 'error');
              return;
            }
            
            getBlockTimeStamp(sozlesmeId, deadline).then((res) => {
              console.log('BLOCK TIMESTAMP : ' + res);
              
              createCampaign(sozlesmeId, campaignOwner, campaignTarget, res).then(async (res) => {
                if(res.status){
                  handleAlert('Kampanya başarıyla oluşturuldu', 'success');
                }
                else{
                  handleAlert('Kampanya oluşturulamadı', 'error');
                }
                let campaigns_ = await getCampaigns(sozlesmeId); 
                console.log(campaigns_)
                let transactions_ = await getTransactions(sozlesmeId);
                console.log(transactions_)
                setCampaigns(campaigns_);
                setTransactions(transactions_);
              }
              );
            }
          
            );
          }}
        />
        
        
        

        {/* ROW 2 */}

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Kampanyalar
            </Typography>
          </Box>
          {campaigns.map((campaign, i) => (
            <Box
              key={`${campaign.owner}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                  fontSize="15px"
                >
                  Owner : {campaign.owner}
                </Typography>
                <Typography color={colors.grey[100]}>
                  Target : {Web3.utils.fromWei(campaign.targetBalance, 'ether')} ETH
                </Typography>
                <Typography color={colors.grey[100]}>
                  Campaign Id : {campaign.id}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>Deadline : {getDate(campaign.deadlineTime)}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {Web3.utils.fromWei(campaign.balance, 'ether')} ETH
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              En Son Yapılan İşlemler
            </Typography>
          </Box>
          {transactions.map((transaction, i) => (
            <Box
              key={`${transaction.owner}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  Owner : {transaction.owner}
                </Typography>
                <Typography color={colors.grey[100]}>
                  Type : {transaction.isDonation ? 'Donation' : 'Withdraw'}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>Date : {getDate(transaction.date)}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {Web3.utils.fromWei(transaction.amount, 'ether')} ETH
              </Box>
            </Box>
          ))}
        </Box>


        

      </Box>
    </Box>
  );
};


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Dashboard />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
