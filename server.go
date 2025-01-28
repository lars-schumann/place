package main

import (
	"fmt"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/static"
)

type point struct {
	x   int //x-coord 1-1000
	y   int //y-coord 1-1000
	col int //colour 1-32?
}

type point_in_time struct {
	p point
	t time.Time //time it was placed
}

func main() {

	app := fiber.New()

	app.Use("/static", static.New("./static"))

	app.Get("/", func(c fiber.Ctx) error {
		return c.Render("./views/index.html", fiber.Map{})
	})

	var canvas [1_000_000]int
	var canvas_updates []point_in_time
	for i := 0; i < len(canvas); i++ {
		canvas[i] = 9
	}

	app.Get("/_canvas/full", func(c fiber.Ctx) error {
		return c.JSON(canvas)
	})

	app.Get("/_canvas/updates", func(c fiber.Ctx) error {
		var trimmed_updates []point_in_time
		var points_to_send [][3]int
		for _, update := range canvas_updates {
			if time.Since(update.t) < 5*time.Second {
				trimmed_updates = append(trimmed_updates, update)
				points_to_send = append(points_to_send, [3]int{update.p.x, update.p.y, update.p.col})
			}
		}
		canvas_updates = trimmed_updates
		fmt.Println(points_to_send)
		return c.JSON(points_to_send)
	})

	app.Get("/_canvas/:x-:y-:col", func(c fiber.Ctx) error {
		x, _ := strconv.Atoi(c.Params("x"))
		y, _ := strconv.Atoi(c.Params("y"))
		col, _ := strconv.Atoi(c.Params("col"))

		canvas[(x-1)+(y-1)*1000] = col
		point_with_time := point_in_time{point{x, y, col}, time.Now()}
		canvas_updates = append(canvas_updates, point_with_time)

		//fmt.Println(point_with_time)
		//fmt.Println(canvas_updates)

		return c.JSON(fiber.Map{
			"_message": "Pixel updated successfully",
			"x":        x,
			"y":        y,
			"col":      col,
		})
	})

	app.Listen(":3000")
}
