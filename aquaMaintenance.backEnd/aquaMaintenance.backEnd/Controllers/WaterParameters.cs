using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace aquaMaintenance.backEnd.Controllers
{
    public class WaterParameters : Controller
    {
        // GET: WaterParameters
        public ActionResult Index()
        {
            return View();
        }

        // GET: WaterParameters/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: WaterParameters/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: WaterParameters/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: WaterParameters/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: WaterParameters/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: WaterParameters/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: WaterParameters/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
