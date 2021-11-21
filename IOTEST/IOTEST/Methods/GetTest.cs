using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace IOTEST.Methods
{
    [UsedImplicitly]
    public class GetTest : IMethod
    {
        [Serializable]
        private class TestX
        {
            [Serializable]
            public class Resource
            {
                public string Url { get; set; }
                public string Name { get; set; }
                public dynamic Loaded { get; set; }
                public int Id { get; set; }

                public Resource(string name, string url)
                {
                    Url = url;
                    Name = name;
                    Id = url.GetHashCode();
                    Loaded = null;
                }
            }

            [Serializable]
            public class DraggableObject
            {
                public double X { get; set; }
                public double Y { get; set; }
                public double ScaleX { get; set; }
                public double ScaleY { get; set; }
                public double Rotation { get; set; }
                public int ResourceId { get; set; }

                public DraggableObject(Resource rex, double x, double y, double sx = 0.1, double sy = 0.1, double r = 0)
                {
                    X = x;
                    Y = y;
                    ScaleX = sx;
                    ScaleY = sy;
                    Rotation = r;
                    ResourceId = rex.Id;
                }
            }

            public string Name { get; set; }
            public List<Resource> Resources { get; set; }
            public List<DraggableObject> DraggableObjects { get; set; }

            public TestX()
            {
                Name = "Test";
                Resources = new List<Resource>
                {
                    new("Cpu", "/TestItems/Prefabs/Electrons/Cpu/1.png"),
                    new("ElectronKey", "/TestItems/Prefabs/Electrons/Keys/2.png"),
                };
                DraggableObjects = new List<DraggableObject>()
                {
                    new(Resources.First(x => x.Name == "Cpu"),200, 200, 0.2,0.2 ),
                    new(Resources.First(x => x.Name == "Cpu"),200, 400),
                    new(Resources.First(x => x.Name == "ElectronKey"),400, 400 ),
                };
            }
        }

        public async Task<string> Invoke(HttpContext context, IoContext db, DataControl control)
        {
            if (!control.IsOk) return "error";
            var data = new TestX();
            return JsonConvert.SerializeObject(data);
        }
    }
}