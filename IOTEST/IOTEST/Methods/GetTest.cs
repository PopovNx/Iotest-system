﻿using System;
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
                public bool Draggable { get; set; }
                public bool ButtonMode { get; set; }
                public int ResourceId { get; set; }
                public int Id { get; set; }

                public DraggableObject(Resource rex, double x, double y, double sx = 0.1, double sy = 0.1, double r = 0,
                    bool draggable = false, bool btn = true, int id = -1)
                {
                    X = x;
                    Y = y;
                    ScaleX = sx;
                    ScaleY = sy;
                    Rotation = r;
                    ResourceId = rex.Id;
                    Draggable = draggable;
                    ButtonMode = btn;
                    Id = id;
                }
            }

            [Serializable]
            public class Trigger
            {
                public Trigger(int x, int y, int size, bool visual = true, bool magnetic = true, int id = -1, params int[] ac)
                {
                    X = x;
                    Y = y;
                    Size = size;
                    Visual = visual;
                    Magnetic = magnetic;
                    Id = id;
                    Accepted = ac.ToList();
                }

                public int X { get; set; }
                public int Y { get; set; }
                public int Size { get; set; }
                public bool Visual { get; set; }
                public bool Magnetic { get; set; }
                public int Id { get; set; }
                public List<int> Accepted { get; set; }
            }

            [Serializable]
            public class Animation
            {
                [Serializable]
                public class EventAction
                {
                    [Serializable]
                    public enum EventType
                    {
                        Rotation = 0,
                        ResourceChange = 1,
                        Visibility = 2,
                        
                    }

                    public EventType Event { get; set; }
                    public List<int> Selector { get; set; }
                    public List<int> Value { get; set; }
                }
                [Serializable]
                public class EventActivator
                {
                    [Serializable]
                    public enum EventType
                    {
                        Always = 0,
                        Never = 1,
                        OnTrigger = 2,
                        OnClick = 3,
                    }

                    public EventType Event { get; set; }
                    public List<int> Selector { get; set; }
                }

                public List<EventActivator> Activators { get; set; }
                public List<EventAction> EventActions { get; set; }
            }

            public string Name { get; set; }
            public List<Resource> Resources { get; set; }
            public List<DraggableObject> DraggableObjects { get; set; }
            public List<Trigger> Triggers { get; set; }
            public List<Animation> Animations { get; set; }

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
                    new(Resources.First(x => x.Name == "Cpu"), 200, 200, 0.2, 0.2,0, false, false, 1),
                    new(Resources.First(x => x.Name == "Cpu"), 200, 400, 0.2, 0.2, 0, true, true, 2),
                    new(Resources.First(x => x.Name == "ElectronKey"), 400, 400, 0.2, 0.2, 0, true, true, 3),
                };
                Triggers = new List<Trigger>()
                {
                    new(600, 400, 50, true, true, 1, 1,2),
                    new(700, 100, 50, true, true, 2,3)
                };
                Animations = new List<Animation>()
                {
                    new()
                    {
                        Activators = new List<Animation.EventActivator>()
                        {
                            new()
                            {
                                Event = Animation.EventActivator.EventType.OnClick,
                                Selector = new List<int>() { 1 }
                            },
                        },
                        EventActions = new List<Animation.EventAction>()
                        {
                            new()
                            {
                                Event = Animation.EventAction.EventType.Visibility,
                                Selector = new List<int> { 2 },
                                Value =  new List<int> { 0, 1 },
                            }
                        }

                    }
                };
            }
        }

        public async Task<string> Invoke(HttpContext context, IoContext db, DataControl control)
        {
            await Task.Yield();
            if (!control.IsOk) return "error";
            var data = new TestX();
            return JsonConvert.SerializeObject(data);
        }
    }
}