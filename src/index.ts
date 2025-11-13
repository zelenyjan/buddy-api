import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono();
app.use('*', cors())

// 1. GET /is-dosage-check
app.get('/is-dosage-check', (c) => {
  const commodityKey = c.req.query('commodity_key');

  if (commodityKey === "1") {
    return c.json({
      requireCalculation: false,
      requireWeight: false,
    });
  } else if (commodityKey === "2") {
    return c.json({
      requireCalculation: true,
      requireWeight: false,
    });
  }
  
  return c.json({
    requireCalculation: true,
    requireWeight: true,
  });
});

// 2. POST /expedition
app.post('/expedition', (c) => {
  return c.json({
    job_id_list: ["11"],
    job_id_list_weight_required: true,
  });
});

// 3. GET /expedition
app.get('/expedition', (c) => {
  const farmisId = c.req.query('farmis_id');
  
  return c.json({
    status: "DONE",
    result: farmisId === "20" ? "OK" : "WARNING",
    text: "Předepsáno: 3,5 ml denně = 175 mg/den (koncentrace 250 mg/5 ml = 50 mg/ml). <br>Doporučené pro dítě 12 kg: 15–30 mg/kg/den = 180–360 mg/den (záleží na indikaci; např. otitis media 30 mg/kg/den = 360 mg/den). <br><br>Nejvyšší povolená dávka pro tohoto pacienta: 360 mg/den. <br><br>Závěr: předepsaná dávka je nižší než doporučený rozsah pro některé indikace, ale nepřekračuje nejvyšší povolenou dávku.",
  });
});


export default app