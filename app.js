let jsData; 

//Bar Chart
function charts(sample_id){
    let chartSample=jsData;
    let valueArray=chartSample.samples.filter(
        (sampleObject)=>sampleObject.id==sample_id);
    console.log(valueArray);
    let sampleValue=valueArray[0];
    let otu_ids=sampleValue.otu_ids;
    let sample_values=sampleValue.sample_values;
    let otu_labels=sampleValue.otu_labels;

    let barData=[{
        x: sample_values.slice(0,10).reverse(),
        y: otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse(),
        text: otu_labels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h",
        marker:{
            size:sample_values.slice(0,10).reverse()
        }    

    }];
    Plotly.newPlot("bar",barData);
    console.log("OTU", otu_ids);
        };

// Bubble Chart
function bubbleCharts(sample_id){
    let chartSample=jsData;
    let valueArray=chartSample.samples.filter(
        (sampleObject)=>sampleObject.id==sample_id);
    console.log(valueArray);
    let sampleValue=valueArray[0];
    let otu_ids=sampleValue.otu_ids;
    let sample_values=sampleValue.sample_values;
    let otu_labels=sampleValue.otu_labels;
            
    let bubbleData=[{
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker:{
            size:sample_values,
            color:otu_ids
        }    
        
        }];
        Plotly.newPlot("bubble",bubbleData);
        };

// Populate Metadata 

   function metadataData(sample_id) {
       let chartSample = jsData;
       let valueArray = chartSample.metadata.filter(
            (sampleObject) => sampleObject.id == sample_id);
            console.log(valueArray);
        let sample_metadata = d3.select("#sample-metadata");
        let sampleValue=valueArray[0];
        sample_metadata.html("");
             
        Object.entries(valueArray[0]).forEach(([key, value]) => {
            sample_metadata.append("p").text(`${key}: ${value}`);
            console.log(`${key}: ${value}`);
        });
      }
    
  
// Update function upon dropdown selection 
function optionChanged(dataOption){
    console.log(dataOption)

charts(dataOption)
bubbleCharts(dataOption)
metadataData(dataOption)
};

function init(){
   d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data)=>{
    jsData = data;
    let samples = jsData.samples.map((sample)=>sample.id);
    let dropdownMenu=d3.select("#selDataset");

    samples.forEach((sample)=>{
        dropdownMenu.append("option").text(sample).property("value",sample);
    });

    let firstSample = samples[0];
    charts(firstSample);
    bubbleCharts(firstSample);
    metadataData(firstSample);

   })

}
init();